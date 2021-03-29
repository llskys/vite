/*
 * @Author: your name
 * @Date: 2021-03-25 17:09:00
 * @LastEditTime: 2021-03-29 10:02:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \coded:\vite\vite-project\vite.config.js
 */
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()]
})
