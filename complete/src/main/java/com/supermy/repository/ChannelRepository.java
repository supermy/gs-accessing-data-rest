package com.supermy.repository;

import com.supermy.domain.Channel;
import com.supermy.domain.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
//import org.springframework.security.access.prepost.PostAuthorize;
//import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

/**
 * http://spring.io/understanding/HATEOAS
 * http://spring.io/understanding/REST
 * http://spring.io/guides/gs/accessing-data-rest/
 *
 * 自动实现rest 框架;
 * 支持Name 约定；
 * 支持hsql 查询；
 * 支持原生sql 查询；
 *
 */
@RepositoryRestResource(collectionResourceRel = "channel_auth", path = "channel_auth")
public interface ChannelRepository extends JpaRepository<Channel, Long> {

	List<Person> findByCode(@Param("code") String name);

    @Query(value = "select u from Channel u where u.name = :lname")
    Channel findByEmailAddress(@Param("lname") String name);

    @Query(value = "select u from Channel u where u.name = ?1") //error fix me
    Channel findByEmailAddress1(String name);

    //n还可以使用@Query来指定本地查询原生sql，只要设置nativeQuery为true，比如：
    //注意：当前版本的本地查询不支持翻页和动态的排序
    @Query(value = "select * from Channel where name like %:name or code like %:code ",nativeQuery=true)
    List<Channel> findByName(@Param("name") String name1, @Param("code") String name2);

//    @Override
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    Page<Channel> findAll(Pageable pageable);
//
//    @Override
//    @PostAuthorize("returnObject.name == principal.username or hasRole('ROLE_ADMIN')")
//    Channel findOne(Long aLong);
//
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    List<Channel> findBynameLike(@Param("name") String name);

//    同样支持更新类的Query语句，添加@Modifying即可，比如：
//    @Modifying
//    @Query(value="update UserModel o set o.name=:newName where o.name like %:nn")
//    public int findByUuidOrAge(@Param("nn") String name,@Param("newName") String newName);
//    注意：
//            1：方法的返回值应该是int，表示更新语句所影响的行数
//    2：在调用的地方必须加事务，没有事务不能正常执行

}