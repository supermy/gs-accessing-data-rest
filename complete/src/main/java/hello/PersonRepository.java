package hello;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface PersonRepository extends JpaRepository<Person, Long> {

	List<Person> findByLastName(@Param("name") String name);

    @Query("select u from Person u where u.firstName = ?1")
    Person findByEmailAddress(String firstName);



    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Page<Person> findAll(Pageable pageable);

    @Override
    @PostAuthorize("returnObject.firstName == principal.username or hasRole('ROLE_ADMIN')")
    Person findOne(Long aLong);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    List<Person> findByFirstNameLike(@Param("firstName") String firstName);


}