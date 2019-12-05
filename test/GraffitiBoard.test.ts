import DummyClass from '../src/index'
import { GBoardApi } from '../src/types'
import { config } from 'shelljs'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('DummyClass is instantiable', () => {
    expect(new DummyClass((config as unknown) as GBoardApi)).toBeInstanceOf(DummyClass)
  })
})
