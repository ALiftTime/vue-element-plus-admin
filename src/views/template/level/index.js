/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-18 10:08:40
 * @LastEditors: BG
 * @LastEditTime: 2022-06-18 17:01:26
 */
import { ref } from 'vue'

const num2 = ref(1)
const onChangeNum2 = () => {
  num2.value++
}

export {
  num2,
  onChangeNum2
}
