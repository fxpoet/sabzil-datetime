const MIN  = 60 * 1000;
const HOUR = 60 * 60 * 1000;

const LOCALES = {
  'utc': 0,
  'ko': 540 // +09:00
}

function pad(number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

// 분 단위로 표시 된 숫자를 +09:00 과 같은 오프셋 문자열로 변환
function getLocaleStringOffset(locale) {
  let timeOffset = 0;

  if (locale == undefined) locale = 'utc';

  if (Number.isInteger(locale))
    timeOffset = locale;

  if (LOCALES[locale] != undefined)
    timeOffset = LOCALES[locale];

  let h = timeOffset / 60;
  let m = timeOffset % 60;
  return pad(h,2)+":"+pad(m, 2);
}


// 로케일이 적용된 타임스탬프 반환 (내부에서 사용)
function getLocaleTime(locale, unixstamp) {
  let timeOffset = locale;

  if (!unixstamp) unixstamp = Date.now();
  if (locale == undefined) locale = 'utc';
  if (LOCALES[locale] != undefined)
    timeOffset = LOCALES[locale];

  return unixstamp + (timeOffset * MIN);
}


// format('ko')  // 현재시각 yyyy-mm-dd hh:mm:ss
function format(locale, unixstamp) {
  let t = getLocaleTime(locale, unixstamp);
  return (new Date(t)).toISOString().split(".")[0].replace("T", ' ');
}


// 주어진 시간의 0시 timestamp.
function clockZero(locale, unixstamp) {
  let t = getLocaleTime(locale, unixstamp);
  let s = (new Date(t).toISOString().split("T")[0] + "T00:00:00+" + getLocaleStringOffset(locale))
  return new Date(s).getTime();
}


// 지정된 날짜의 0시부터 현재까지 지난 시간.
function fromZero(locale, unixstamp) {
  if (!unixstamp) unixstamp = Date.now();
  return unixstamp - clockZero(locale, unixstamp);
}

function startOf(unit) {
	// year
	// month
	// week
	// day
	// week_ko
	// day
	// hour
	// minute
	// second
}


// 하루를 second 만큼 라운드를 쪼갠 뒤, 해당 시간이 몇 라운드째인지 반환
// 0 부터 시작
function round(locale, second, unixstamp, shift) {
  if (shift == undefined) shift = 0;
  let zero  = fromZero(locale, unixstamp - shift);
  return Math.floor(zero / (second * 1000));
}

// 다음 라운드가 시작되는 시간.
function nextRoundTime(locale, second, unixstamp, shift) {
  if (shift == undefined) shift = 0;
  let r = round(locale, second, unixstamp, shift);
  let zero = clockZero(locale, unixstamp);
  let next = zero + ((r+1) * (second * 1000)) + shift;
  return next;
}


module.exports = {
  getLocaleTime,
  format,
  getLocaleStringOffset,
  clockZero,
  fromZero,
  round,
  nextRoundTime
}