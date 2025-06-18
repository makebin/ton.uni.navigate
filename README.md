### 基于uniapp的 页面跳转lib

```ts
import uniNavigate from 'ton.uni.navigate';

// 定义页面接口
interface IPage {
  path: string;
  name: string;
  meta: {
    target: string;
  };
}

// 示例 pages 数组
const pages: IPage[] = [
  {
    path: '/home',
    name: 'HomePage',
    meta: {
      target: 'self'
    }
  },
  {
    path: '/about',
    name: 'AboutPage',
    meta: {
      target: 'blank'
    }
  }
];

// 创建导航实例
const handle = new uniNavigate(pages);

// 导航调用（可以是字符串或者页面对象）
handle.to('/home');
handle.to({
  path: '/about',
  name: 'AboutPage',
  meta: {
    target: 'blank'
  }
});

```
