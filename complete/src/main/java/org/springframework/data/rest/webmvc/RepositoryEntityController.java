//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package org.springframework.data.rest.webmvc;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Sort;
import org.springframework.data.mapping.model.BeanWrapper;
import org.springframework.data.repository.support.Repositories;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.event.AfterCreateEvent;
import org.springframework.data.rest.core.event.AfterDeleteEvent;
import org.springframework.data.rest.core.event.AfterSaveEvent;
import org.springframework.data.rest.core.event.BeforeCreateEvent;
import org.springframework.data.rest.core.event.BeforeDeleteEvent;
import org.springframework.data.rest.core.event.BeforeSaveEvent;
import org.springframework.data.rest.core.invoke.RepositoryInvoker;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.data.rest.core.mapping.SearchResourceMappings;
import org.springframework.data.rest.webmvc.AbstractRepositoryRestController;
import org.springframework.data.rest.webmvc.ControllerUtils;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.data.rest.webmvc.ResourceType;
import org.springframework.data.rest.webmvc.RestMediaTypes;
import org.springframework.data.rest.webmvc.RootResourceInformation;
import org.springframework.data.rest.webmvc.support.BackendId;
import org.springframework.data.rest.webmvc.support.DefaultedPageable;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceSupport;
import org.springframework.hateoas.Resources;
import org.springframework.hateoas.UriTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RepositoryRestController
class RepositoryEntityController extends AbstractRepositoryRestController implements ApplicationEventPublisherAware {
    private static final String BASE_MAPPING = "/{repository}";
    private static final List<String> ACCEPT_PATCH_HEADERS;
    private final RepositoryEntityLinks entityLinks;
    private final RepositoryRestConfiguration config;
    private final ConversionService conversionService;
    private ApplicationEventPublisher publisher;

    @Autowired
    public RepositoryEntityController(Repositories repositories, RepositoryRestConfiguration config, RepositoryEntityLinks entityLinks, PagedResourcesAssembler<Object> assembler, @Qualifier("defaultConversionService") ConversionService conversionService) {
        super(assembler);
        this.entityLinks = entityLinks;
        this.config = config;
        this.conversionService = conversionService;
    }

    public void setApplicationEventPublisher(ApplicationEventPublisher publisher) {
        this.publisher = publisher;
    }

    @RequestMapping(
            value = {"/{repository}"},
            method = {RequestMethod.OPTIONS}
    )
    public ResponseEntity<?> optionsForCollectionResource(RootResourceInformation information) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAllow(information.getSupportedMethods(ResourceType.COLLECTION));
        return new ResponseEntity(headers, HttpStatus.OK);
    }

    @RequestMapping(
            value = {"/{repository}"},
            method = {RequestMethod.HEAD}
    )
    public ResponseEntity<?> headCollectionResource(RootResourceInformation resourceInformation) throws HttpRequestMethodNotSupportedException {
        resourceInformation.verifySupportedMethod(HttpMethod.HEAD, ResourceType.COLLECTION);
        RepositoryInvoker invoker = resourceInformation.getInvoker();
        if(null == invoker) {
            throw new ResourceNotFoundException();
        } else {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
    }

    @ResponseBody
    @RequestMapping(
            value = {"/{repository}"},
            method = {RequestMethod.GET}
    )
    public Resources<?> getCollectionResource(RootResourceInformation resourceInformation, DefaultedPageable pageable, Sort sort, PersistentEntityResourceAssembler assembler) throws ResourceNotFoundException, HttpRequestMethodNotSupportedException {
        resourceInformation.verifySupportedMethod(HttpMethod.GET, ResourceType.COLLECTION);
        RepositoryInvoker invoker = resourceInformation.getInvoker();
        if(null == invoker) {
            throw new ResourceNotFoundException();
        } else {
            Iterable results;
            if(pageable.getPageable() != null) {
                results = invoker.invokeFindAll(pageable.getPageable());
            } else {
                results = invoker.invokeFindAll(sort);
            }

            ResourceMetadata metadata = resourceInformation.getResourceMetadata();
            SearchResourceMappings searchMappings = metadata.getSearchResourceMappings();
            ArrayList links = new ArrayList();
            if(searchMappings.isExported()) {
                links.add(this.entityLinks.linkFor(metadata.getDomainType()).slash(searchMappings.getPath()).withRel(searchMappings.getRel()));
            }

            Link baseLink = this.entityLinks.linkToPagedResource(resourceInformation.getDomainType(), pageable.isDefault()?null:pageable.getPageable());
            System.out.println("----------:"+results);
            Resources resources = this.resultToResources(results, assembler, baseLink);
            resources.add(links);
            System.out.println("---------"+resources);
            return resources;
        }
    }

    @ResponseBody
    @RequestMapping(
            value = {"/{repository}"},
            method = {RequestMethod.GET},
            produces = {"application/x-spring-data-compact+json", "text/uri-list"}
    )
    public Resources<?> getCollectionResourceCompact(RootResourceInformation repoRequest, DefaultedPageable pageable, Sort sort, PersistentEntityResourceAssembler assembler) throws ResourceNotFoundException, HttpRequestMethodNotSupportedException {
        Resources resources = this.getCollectionResource(repoRequest, pageable, sort, assembler);
        ArrayList links = new ArrayList(resources.getLinks());
        Iterator var7 = resources.getContent().iterator();

        while(var7.hasNext()) {
            Resource resource = (Resource)var7.next();
            PersistentEntityResource persistentEntityResource = (PersistentEntityResource)resource;
            links.add(this.resourceLink(repoRequest, persistentEntityResource));
        }

        return (Resources)(resources instanceof PagedResources?new PagedResources(Collections.emptyList(), ((PagedResources)resources).getMetadata(), links):new Resources(Collections.emptyList(), links));
    }

    @ResponseBody
    @RequestMapping(
            value = {"/{repository}"},
            method = {RequestMethod.POST}
    )
    public ResponseEntity<ResourceSupport> postCollectionResource(RootResourceInformation resourceInformation, PersistentEntityResource payload, PersistentEntityResourceAssembler assembler) throws HttpRequestMethodNotSupportedException {
        resourceInformation.verifySupportedMethod(HttpMethod.POST, ResourceType.COLLECTION);
        return this.createAndReturn(payload.getContent(), resourceInformation.getInvoker(), assembler);
    }

    @RequestMapping(
            value = {"/{repository}/{id}"},
            method = {RequestMethod.OPTIONS}
    )
    public ResponseEntity<?> optionsForItemResource(RootResourceInformation information) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAllow(information.getSupportedMethods(ResourceType.ITEM));
        headers.put("Accept-Patch", ACCEPT_PATCH_HEADERS);
        return new ResponseEntity(headers, HttpStatus.OK);
    }

    @RequestMapping(
            value = {"/{repository}/{id}"},
            method = {RequestMethod.HEAD}
    )
    public ResponseEntity<?> headForItemResource(RootResourceInformation resourceInformation, @BackendId Serializable id) throws HttpRequestMethodNotSupportedException {
        if(this.getItemResource(resourceInformation, id) != null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } else {
            throw new ResourceNotFoundException();
        }
    }

    @RequestMapping(
            value = {"/{repository}/{id}"},
            method = {RequestMethod.GET}
    )
    public ResponseEntity<Resource<?>> getItemResource(RootResourceInformation resourceInformation, @BackendId Serializable id, PersistentEntityResourceAssembler assembler) throws HttpRequestMethodNotSupportedException {
        Object domainObj = this.getItemResource(resourceInformation, id);
        return domainObj == null?new ResponseEntity(HttpStatus.NOT_FOUND):new ResponseEntity(assembler.toFullResource(domainObj), HttpStatus.OK);
    }

    @RequestMapping(
            value = {"/{repository}/{id}"},
            method = {RequestMethod.PUT}
    )
    public ResponseEntity<? extends ResourceSupport> putItemResource(RootResourceInformation resourceInformation, PersistentEntityResource payload, @BackendId Serializable id, PersistentEntityResourceAssembler assembler) throws HttpRequestMethodNotSupportedException {
        resourceInformation.verifySupportedMethod(HttpMethod.PUT, ResourceType.ITEM);
        BeanWrapper incomingWrapper = BeanWrapper.create(payload.getContent(), this.conversionService);
        incomingWrapper.setProperty(payload.getPersistentEntity().getIdProperty(), id);
        RepositoryInvoker invoker = resourceInformation.getInvoker();
        Object objectToSave = incomingWrapper.getBean();
        return invoker.invokeFindOne(id) == null?this.createAndReturn(objectToSave, invoker, assembler):this.saveAndReturn(objectToSave, invoker, HttpMethod.PUT, assembler);
    }

    @RequestMapping(
            value = {"/{repository}/{id}"},
            method = {RequestMethod.PATCH}
    )
    public ResponseEntity<ResourceSupport> patchItemResource(RootResourceInformation resourceInformation, PersistentEntityResource payload, @BackendId Serializable id, PersistentEntityResourceAssembler assembler) throws HttpRequestMethodNotSupportedException, ResourceNotFoundException {
        resourceInformation.verifySupportedMethod(HttpMethod.PATCH, ResourceType.ITEM);
        if(resourceInformation.getInvoker().invokeFindOne(id) == null) {
            throw new ResourceNotFoundException();
        } else {
            return this.saveAndReturn(payload.getContent(), resourceInformation.getInvoker(), HttpMethod.PATCH, assembler);
        }
    }

    @RequestMapping(
            value = {"/{repository}/{id}"},
            method = {RequestMethod.DELETE}
    )
    public ResponseEntity<?> deleteItemResource(RootResourceInformation resourceInformation, @BackendId Serializable id) throws ResourceNotFoundException, HttpRequestMethodNotSupportedException {
        resourceInformation.verifySupportedMethod(HttpMethod.DELETE, ResourceType.ITEM);
        RepositoryInvoker invoker = resourceInformation.getInvoker();
        Object domainObj = invoker.invokeFindOne(id);
        if(domainObj == null) {
            throw new ResourceNotFoundException();
        } else {
            this.publisher.publishEvent(new BeforeDeleteEvent(domainObj));
            invoker.invokeDelete(id);
            this.publisher.publishEvent(new AfterDeleteEvent(domainObj));
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
    }

    private ResponseEntity<ResourceSupport> saveAndReturn(Object domainObject, RepositoryInvoker invoker, HttpMethod httpMethod, PersistentEntityResourceAssembler assembler) {
        this.publisher.publishEvent(new BeforeSaveEvent(domainObject));
        Object obj = invoker.invokeSave(domainObject);
        this.publisher.publishEvent(new AfterSaveEvent(domainObject));
        HttpHeaders headers = new HttpHeaders();
        if(HttpMethod.PUT.equals(httpMethod)) {
            this.addLocationHeader(headers, assembler, obj);
        }

        return this.config.isReturnBodyOnUpdate()?ControllerUtils.toResponseEntity(HttpStatus.OK, headers, assembler.toFullResource(obj)):ControllerUtils.toEmptyResponse(HttpStatus.NO_CONTENT, headers);
    }

    private ResponseEntity<ResourceSupport> createAndReturn(Object domainObject, RepositoryInvoker invoker, PersistentEntityResourceAssembler assembler) {
        this.publisher.publishEvent(new BeforeCreateEvent(domainObject));
        Object savedObject = invoker.invokeSave(domainObject);
        this.publisher.publishEvent(new AfterCreateEvent(savedObject));
        HttpHeaders headers = new HttpHeaders();
        this.addLocationHeader(headers, assembler, savedObject);
        System.out.println("--------------:"+savedObject.toString());
        PersistentEntityResource resource = this.config.isReturnBodyOnCreate()?assembler.toFullResource(savedObject):null;

        System.out.println("--------------:"+resource.toString());
        System.out.println("--------------:"+resource.getEmbeddeds());

        return ControllerUtils.toResponseEntity(HttpStatus.CREATED, headers, resource);
    }

    private void addLocationHeader(HttpHeaders headers, PersistentEntityResourceAssembler assembler, Object source) {
        String selfLink = assembler.getSelfLinkFor(source).getHref();
        headers.setLocation((new UriTemplate(selfLink)).expand(new Object[0]));
    }

    private Object getItemResource(RootResourceInformation resourceInformation, Serializable id) throws HttpRequestMethodNotSupportedException, ResourceNotFoundException {
        resourceInformation.verifySupportedMethod(HttpMethod.GET, ResourceType.ITEM);
        RepositoryInvoker repoMethodInvoker = resourceInformation.getInvoker();
        if(!repoMethodInvoker.exposesFindOne()) {
            throw new ResourceNotFoundException();
        } else {
            return repoMethodInvoker.invokeFindOne(id);
        }
    }

    static {
        ACCEPT_PATCH_HEADERS = Arrays.asList(new String[]{RestMediaTypes.MERGE_PATCH_JSON.toString(), RestMediaTypes.JSON_PATCH_JSON.toString(), "application/json"});
    }
}
