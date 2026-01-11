// Popup 入口文件
// 导入并渲染 Popup 组件
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Popup from './popup'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Popup />
  </StrictMode>
)
