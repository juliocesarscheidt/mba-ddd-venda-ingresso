
```bash

docker-compose up -d mysql


docker-compose logs -f --tail 100 mysql


docker-compose exec mysql sh -c "mysql -uroot -padmin -e 'show tables from events'"

docker-compose exec mysql sh -c "mysql -uroot -padmin -e 'select * from events.customer'"
docker-compose exec mysql sh -c "mysql -uroot -padmin -e 'select * from events.event'"
docker-compose exec mysql sh -c "mysql -uroot -padmin -e 'select * from events.event_section'"
docker-compose exec mysql sh -c "mysql -uroot -padmin -e 'select * from events.event_spot'"
docker-compose exec mysql sh -c "mysql -uroot -padmin -e 'select * from events.order'"
docker-compose exec mysql sh -c "mysql -uroot -padmin -e 'select * from events.partner'"
docker-compose exec mysql sh -c "mysql -uroot -padmin -e 'select * from events.spot_reservation'"


yarn run test

yarn start:dev


npx mikro-orm schema:fresh --run

"mikro-orm": {
  "useTsNode": true,
  "configPaths": [
    "./src/mikro-orm.config.ts",
    "./dist/mikro-orm.config.js"
  ]
}


# partners
curl -s -X POST --data-raw '{"name": "Partner 1"}' -H 'Content-type: application/json' --url http://localhost:3000/partners

curl -s -X GET --url http://localhost:3000/partners | jq



# customers
curl -s -X POST --data-raw '{"name": "Customer 1", "cpf": "71152471023"}' -H 'Content-type: application/json' --url http://localhost:3000/customers

curl -s -X GET --url http://localhost:3000/customers | jq



# events
curl -s -X POST --data-raw '{"name": "Event 1", "description": "Description 1", "date": "2023-01-01T00:00:00.000Z", "partner_id": "ff5aefb3-1501-41b4-ac04-32a231e643c8"}' -H 'Content-type: application/json' --url http://localhost:3000/events

curl -s -X GET --url http://localhost:3000/events | jq



# sections
curl -s -X GET --url http://localhost:3000/events/8a68df6b-f05f-4818-abcc-b5329394d09e/sections | jq


curl -s -X POST --data-raw '{"name": "Section 1", "description": "Description 1", "total_spots": 10, "price": 100}' -H 'Content-type: application/json' --url http://localhost:3000/events/8a68df6b-f05f-4818-abcc-b5329394d09e/sections


curl -s -X PUT --data-raw '{"name": "Section 2", "description": "Description 2"}' -H 'Content-type: application/json' --url http://localhost:3000/events/8a68df6b-f05f-4818-abcc-b5329394d09e/sections/ce90aae0-625f-44e0-a0b2-e19e4760fa13


curl -s -X PUT -H 'Content-type: application/json' --url http://localhost:3000/events/8a68df6b-f05f-4818-abcc-b5329394d09e/publish-all



# spots
curl -s -X GET --url http://localhost:3000/events/8a68df6b-f05f-4818-abcc-b5329394d09e/sections/ce90aae0-625f-44e0-a0b2-e19e4760fa13/spots | jq

curl -s -X PUT --data-raw '{"location": "Location 1"}' -H 'Content-type: application/json' --url http://localhost:3000/events/8a68df6b-f05f-4818-abcc-b5329394d09e/sections/ce90aae0-625f-44e0-a0b2-e19e4760fa13/spots/19d35512-a181-4b6b-9782-8908326ee163



# orders
curl -s -X POST --data-raw '{"customer_id": "79b99415-b55d-4b95-8bd1-438f92453a5b", "section_id": "ce90aae0-625f-44e0-a0b2-e19e4760fa13", "spot_id": "19d35512-a181-4b6b-9782-8908326ee163", "card_token": "visa-0000"}' -H 'Content-type: application/json' --url http://localhost:3000/events/8a68df6b-f05f-4818-abcc-b5329394d09e/orders

curl -s -X GET --url http://localhost:3000/events/8a68df6b-f05f-4818-abcc-b5329394d09e/orders | jq



```
