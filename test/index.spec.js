const DateTime = require('../index.js')

test('format', () => {

    let a = DateTime.format('ko', 1573413617578)

    expect( a ).toBe("2019-11-11 04:20:17")
    console.log(a)

})

// 타임스탬프에 타임오프셋을 더한 값을 만들어 냄 (내부용)
test('getLocaleTime', () => {

    let gap = Date.now() - DateTime.getLocaleTime()

    expect( gap ).toBeLessThanOrEqual(10)

    let b = DateTime.getLocaleTime('ko', 1573413617578)

    expect(b).toBe( 1573413617578 + (9*60*60*1000) )

    let c = DateTime.getLocaleTime(null, 1573413617578)

    expect(c).toBe( 1573413617578 )
})

// 분 단위로 표시 된 숫자를 +09:00 과 같은 오프셋 문자열로 변환
test('getLocaleStringOffset', () => {

    let a = DateTime.getLocaleStringOffset('ko')

    expect(a).toBe("09:00")
})

// 특정 시간의 00:00 의 타임스탬프
test('clockZero', () => {

    let a = DateTime.clockZero('ko', 1573413617578)
    expect(new Date(a).toISOString()).toBe("2019-11-10T15:00:00.000Z")

    let b = DateTime.clockZero(null, 1573413617578)
    expect(new Date(b).toISOString()).toBe("2019-11-10T00:00:00.000Z")

})

// 제로 시간부터 지난 타임스탬프
test('fromZero', () => {
    let a = DateTime.fromZero('ko', 1573413617578)
    expect(a).toBe( 15617578 )
})

// 제로 시간부터 지난 타임스탬프
test('round', () => {
    let r = DateTime.round('ko', 2*60, 1573423918878)
    expect(r).toBe( 215 )
})

// 제로 시간부터 지난 타임스탬프
test('nextRoundTime', () => {
    let next_r = DateTime.nextRoundTime('ko', 2*60, 1573423918878)
    let next_str = new Date(next_r).toString();
    expect(next_str).toBe( "Mon Nov 11 2019 07:12:00 GMT+0900 (GMT+09:00)")
})
