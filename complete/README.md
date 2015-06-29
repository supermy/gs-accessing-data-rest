MobileApp
=========
2015-06-29

    Extjs grid 的下拉选项与显示预处理完成
    
    两个老问题圆满解决。
    extjs grid filter 条件编辑面板在chrome 浏览器下失效的问题解决；
    行编辑器保存按钮，在数据正确之后不能自动变回的问题解决。
    
    修正日期 boolean 类型的过滤
    
2015-06-27
    完成filter 编写，完成filterController编写，完成对 findAll 过滤查询调试；
    http://127.0.0.1:8080/filter/channel/?_dc=1435308762365&sort=name%2CASC&sort=code%2CDESC&page=0&filter=%5B%7B%22type%22%3A%22numeric%22%2C%22comparison%22%3A%22lt%22%2C%22value%22%3A6%2C%22field%22%3A%22id%22%7D%2C%7B%22type%22%3A%22numeric%22%2C%22comparison%22%3A%22gt%22%2C%22value%22%3A2%2C%22field%22%3A%22id%22%7D%2C%7B%22type%22%3A%22string%22%2C%22value%22%3A%2212%22%2C%22field%22%3A%22code%22%7D%2C%7B%22type%22%3A%22boolean%22%2C%22value%22%3Atrue%2C%22field%22%3A%22status%22%7D%2C%7B%22type%22%3A%22date%22%2C%22comparison%22%3A%22lt%22%2C%22value%22%3A11122222%2C%22field%22%3A%22createDate%22%7D%5D&start=0&size=10
    todo:filger  与 extjs rest  整合
    
    内部整合 todo?
    http://127.0.0.1:8080/channel_auth/filter/?_dc=1435308762365&sort=name%2CASC&sort=code%2CDESC&page=0&filter=%5B%7B%22type%22%3A%22numeric%22%2C%22comparison%22%3A%22lt%22%2C%22value%22%3A6%2C%22field%22%3A%22id%22%7D%2C%7B%22type%22%3A%22numeric%22%2C%22comparison%22%3A%22gt%22%2C%22value%22%3A2%2C%22field%22%3A%22id%22%7D%2C%7B%22type%22%3A%22string%22%2C%22value%22%3A%2212%22%2C%22field%22%3A%22code%22%7D%2C%7B%22type%22%3A%22boolean%22%2C%22value%22%3Atrue%2C%22field%22%3A%22status%22%7D%2C%7B%22type%22%3A%22date%22%2C%22comparison%22%3A%22lt%22%2C%22value%22%3A11212212%2C%22field%22%3A%22createDate%22%7D%5D&start=0&size=10

    Pageable and PageRequest 增加参数 MyFilter;
    SimpleJpaRepository 增加filter 参数处理判断；
    增加MyRepositoryEntityController，增加/{repository}/filter入口

    todo:
            lua  template 简化消费者的前端使用。
            
2015-06-25
    spring-data-rest 排序查询
    http://127.0.0.1:8080/channel_auth?page=1&size=10&sort=name,desc&sort=code,asc

    //废除
    AbstractPageRequest1
    public int getOffset() {//fixme jamesmo 2016-06-23 解决page=1传递进来，其实计算错误的问题。
        return (page-1) * size;
    }
    
    filter test url
    http://127.0.0.1:8080/channel_auth/filter/?_dc=1435308762365&sort=name%2CASC&sort=code%2CDESC&page=0&filter=%5B%7B%22type%22%3A%22numeric%22%2C%22comparison%22%3A%22lt%22%2C%22value%22%3A6%2C%22field%22%3A%22pkId%22%7D%2C%7B%22type%22%3A%22numeric%22%2C%22comparison%22%3A%22gt%22%2C%22value%22%3A2%2C%22field%22%3A%22pkId%22%7D%2C%7B%22type%22%3A%22string%22%2C%22value%22%3A%2212%22%2C%22field%22%3A%22code%22%7D%2C%7B%22type%22%3A%22boolean%22%2C%22value%22%3Atrue%2C%22field%22%3A%22status%22%7D%2C%7B%22type%22%3A%22date%22%2C%22comparison%22%3A%22lt%22%2C%22value%22%3A%2206%2F26%2F2015%22%2C%22field%22%3A%22createDate%22%7D%5D&start=0&size=10

2015-06-24
    完成后端返回值的规范处理，processReponse
    完成用户操作之后的提示信息,afterRequest
    完成Controler级别变量定义，总记录数，total
    完成form 方式编辑与新增
    todo remote filter

2015-06-23
    后端类型定义死了，不好更改返回值；
    从前端更改。
    

2015-06-22
curl -i -X PUT -H "Content-Type:application/json"              \
    -d '{"pkId": 1, "name": "test1", "code": "test", "pwd": "test", "tokenExpire": "1", "iplist": "192.168.59.103"}'    \
    http://127.0.0.1:8080/channel_auth/1

2015-06-19
能否成功与extends ResourceSupport和权限系统都关系，都去掉即可。


curl -i -X POST -H "Content-Type:application/json" -d '{  "firstName" : "Frodo",  "lastName" : "Baggins" }' http://localhost:8080/people
curl -X PUT -H "Content-Type:application/json" -d '{ "firstName": "Bilbo", "lastName": "Baggins" }' http://localhost:8080/people/1
curl http://localhost:8080/people/1
curl -X DELETE http://localhost:8080/people/1


2015-06-17
    hibernate 生成数据库
    spring data.sql 完成数据的导入
    rest 生产者与消费者的概念；
    生产者：spring-data-rest
    消费者：thymeleaf+[lua-resty-template  extjs bootstrap]
    
    
    Thymeleaf是一个XML/XHTML/HTML5模板引擎，可用于Web与非Web环境中的应用开发
    Thymeleaf提供了一个用于整合Spring MVC的可选模块，在应用开发中，你可以使用Thymeleaf来完全代替JSP，或其他模板引擎，如Velocity、
    FreeMarker等。Thymeleaf的主要目标在于提供一种可被浏览器正确显示的、格式良好的模板创建方式，因此也可以用作静态建模。你可以使用它
    创建经过验证的XML与HTML模板。相对于编写逻辑或代码，开发者只需将标签属性添加到模板中即可。接下来，这些标签属性就会在DOM（文档对象
    模型）上执行预先制定好的逻辑。
    
    # 代表 获取对象 从 messages bundle 也就是消息的资源本地化文件
    $ 表示从model里面获取
    # $这2个可以一起用 比如#{'system.'+${model.id}}  -----这相当于 #{system.01}的资源本地化文件中的system.01内容
    表达式基本对象：
            #ctx：context object
            #root或者#vars
            #locale
            #httpServletRequest
            #httpSession
             
            表达式功能对象：
            #dates：java.util.Date的功能方法类。
            #calendars:类似#dates，面向java.util.Calendar
            #numbers:格式化数字的功能方法类。
            #strings：字符串对象的功能类，contains,startWiths,prepending/appending等等。
            #objects:对objects的功能类操作。
            #bools:对布尔值求值的功能方法。
            #arrays：对数组的功能类方法。
            #lists:对lists功能类方法
            #sets
            #maps
            #aggregates:对数组或者集合创建聚合的功能方法，
            th:text="${#aggregates.sum(o.orderLines.{purchasePrice * amount})}"
             
            #messages:在变量表达式中获取外部信息的功能类方法。
            #ids：处理可能重复的id属性的功能类方法。
    
            <table>
              <thead>
                <tr>
                  <th th:text="#{msgs.headers.name}">Name</th>
                  <th th:text="#{msgs.headers.price}">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr th:each="prod : ${allProducts}">
                  <td th:text="${prod.name}">Oranges</td>
                  <td th:text="${#numbers.formatDecimal(prod.price,1,2)}">0.99</td>
                </tr>
              </tbody>
            </table>

    
2015-06-05
    最新的rest框架技术，注解无xml 配置
    
    http://127.0.0.1:8080/people/
    http://127.0.0.1:8080/people/1
    http://127.0.0.1:8080/people/?page=1&size=2&sort=firstName
    http://127.0.0.1:8080/people/?page=1&size=2&sort=firstName,asc
    
    http://127.0.0.1:8080/people/search
    http://127.0.0.1:8080/people/search/findByLastName?name=客气
    http://127.0.0.1:8080/people/search/findByFirstNameLike?firstName=实施跟踪12%  --通配符号需要转码
    http://127.0.0.1:8080/people/search/findByEmailAddress?lname=施跟踪2
    http://127.0.0.1:8080/people/search/findByName?name1=跟踪12&name2=气
    
    java -jar target/gs-accessing-data-rest-0.1.0.jar
    

2015-05-06
    http://127.0.0.1:8080/login
    http://127.0.0.1:8080/hello
    http://127.0.0.1:8080/admin
    

2015-01-09
    安全框架:类的注解生效失效
            JdbcSecurityConfig 便于固有系统的集成，整合原有的用户权限表； 
            UserSecurityConfig 便于新系统的建立，自动建立数据表。
            

before ......
Test Spring MVC REST application based on mysql

测试 ok
    mvn spring-boot:run

todo:

    rest excetion 信息控制