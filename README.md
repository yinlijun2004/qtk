# QTK - Quick ToolKit
------------------------------------------------

QTK 是一套基于HTML5 Canvas实现的应用程序框架，和其它HTML5的框架相比，它并不适合开发网页，而是专注于应用程序开发。

QTK主要特色如下：

1.**基于HTML5 Canvas实现**。可以实现任何Native风格的控件，HTML5 Canvas使用硬件加速，轻松实现60FPS的动画。

2.**高效率，低功耗**。JS代码针对V8优化，执行效率高。在界面有变化时才重新绘制，支持脏矩形，只绘制变化的部分，让计算开销降到最低。

3.**用QTK本身开发的IDE**。支持在线版本和本地版本，让开发变得更简单。

4.**即可以开发移动应用程序，又可以开发桌面应用程序**。QTK内部抽象出两者的不同，在运行时自动安装相应的策略。

5.**与传统HTML5控件良好互通**。可以在QTK中使用HTML5元素，也可以在HTML5的控件中使用QTK。我们还计划支持React和WebComponent的编程方式。

6.**完整的测试程序**。QTK使用Karma + Mocha对所以组件进行测试，通过不断完善测试程序，让你没有后顾之忧。

7.**完整的文档和示例**。确保已经实现的控件，对使用者都是友好的，你可以无障碍的使用它们，请告诉我们任何让你产生挫折的地方，一定会得到优先解决。在开发的过程中我们也会在博客中写出QTK内部实现原理，以及做出某些决策的原因。

------------------------------

1.[BLOG](https://qtoolkit.github.io/)

2.基本控件DEMO [在线演示](https://qtoolkit.github.io/demos/index.html)

3.Proton粒子编辑器[在线演示](https://qtoolkit.github.io/qtk-proton-editor/index.html) [项目源码](https://github.com/qtoolkit/qtk-proton-editor)

4.Todo MVC [在线演示](https://qtoolkit.github.io/qtk-todo-mvc/index.html) [项目源码](https://github.com/qtoolkit/qtk-todo-mvc)

------------------------------

### 编译
```
npm run build 
```

### 单元测试
```
npm run test 
```

### 运行Demos

```
npm run start
```


