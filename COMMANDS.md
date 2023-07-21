
```bash

docker-compose up -d mysql


docker-compose logs -f --tail 100 mysql


docker-compose exec mysql sh -c "mysql -uroot -padmin -e 'select * from events.partner'"


```
