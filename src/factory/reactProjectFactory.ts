import { Factory } from './factory'

export class ReactProjectFactory extends Factory {
  async setup() {
    // 1. CRA 호출

    // if. node_modules 설치 필요 여부 확인

    // if. git 설정 여부에 따라 처리

    // if. Prettier 설정 여부에 따라 처리

    // if. ESLint 설정 여부에 따라 처리
  }

  getWorkDir(): string {
    return ''
  }
}
