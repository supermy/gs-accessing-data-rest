INSERT INTO users(username,password,enabled)
VALUES ('jamesmo','$2a$10$04TVADrR6/SPLBjsK0N30.Jf5fNjBugSACeGv1S69dZALR7lSov0y', true);
INSERT INTO users(username,password,enabled)
VALUES ('alex','$2a$10$04TVADrR6/SPLBjsK0N30.Jf5fNjBugSACeGv1S69dZALR7lSov0y', true);

INSERT INTO user_roles (username, role)
VALUES ('jamesmo', 'ROLE_USER');
INSERT INTO user_roles (username, role)
VALUES ('jamesmo', 'ROLE_ADMIN');
INSERT INTO user_roles (username, role)
VALUES ('alex', 'ROLE_USER');


insert into channel_auth (id,name,code,pwd,token,token_expire,iplist,ip_bind_time,ip_time_out,connect_count,limit_bandwidth,status,createDate,updateDate,createBy,updateBy)
        values(1,'test','test','test',md5('testtest192.168.59.103bonc1234'),1,'192.168.59.103',300,60,100,100,1,NOW(),NOW(),'system1','system2');


INSERT INTO Person (firstName, lastName)
VALUES ('james', 'mo');
