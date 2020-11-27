import { SafeJsonPluginDate, SafeJsonPluginBuffer } from '../src'
import 'should'
describe('SafeJsonPlugin', () => {
    it('测试Date类的转换', () => {
        const plugin = new SafeJsonPluginDate()
        const date = new Date('2019-01-01T00:00:00Z')
        const obj1 = plugin.serialize(date)
        obj1.should.deepEqual({ __type: 'Date', iso: '2019-01-01T00:00:00.000Z' })
        const date2 = plugin.deserialize(obj1);
        (date2 instanceof Date).should.ok()
    })
    it('测试Buffer类的转换', () => {
        const plugin = new SafeJsonPluginBuffer()
        const buff = Buffer.from('123456')
        const obj1 = plugin.serialize(buff)
        obj1.should.deepEqual({ __type: 'Bytes', base64: 'MTIzNDU2' })
        const buff2 = plugin.deserialize(obj1);
        (buff2 instanceof Buffer).should.ok()
    })
})
