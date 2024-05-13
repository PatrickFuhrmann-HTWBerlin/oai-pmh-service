docker run \
   -p 7005:3001 \
   -e DATABASE=dacat-next \
   -e COLLECTION_ID=_id  \
   -e COLLECTION=PublishedData \
   -e DB_HOST=mongodb \
   -e DB_PORT=27017 \
   --network=scicatlive_default \
   --name=oai-pmh-service \
   oai-pmh
