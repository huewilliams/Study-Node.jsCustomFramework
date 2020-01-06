require('should');
const sinon = require('sinon');
const debug = require('./debug');

describe('debug', () => {
    describe('생성', () => {
        it('태그명을 인자로 받는다. (없으면 예외를 던진다)', () => {
            should(() => debug()).throw();
        })

        it('색상을 인자로 받는다. (없거나 숫자가 아니라면 예외를 던진다)', () => {
            should(() => debug('test')).throw();
            should(() => debug('test', '0')).throw();
        })

        it('함수를 반환한다.', () => {
            const debug = require('./debug')('test', 0);
            should(typeof debug).be.equal('function');
        })
    })

    describe('반환된 함수', () => {
        let debug, tag, msg;

        beforeEach(() => {
            tag = 'test';
            debug = require('./debug')(tag, 0);
            msg = 'hello debug!';
        })

        it('tag + message 형식의 로그 문자열을 반환한다.', () => {
            const expected = `\x1b[36m [${tag}] \x1b[0m ${msg}`;
            const actual = debug(msg);
            actual.should.be.equal(expected);
        })

        it('로그 문자열을 인자로 console.log 함수를 실행한다.', () => {
            sinon.spy(console, 'log');
            const expected = `\x1b[36m [${tag}] \x1b[0m ${msg}`;

            debug(msg);

            sinon.assert.calledWith(console.log, expected);
        })
    })
})