package com.mirza.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mirza.chat.model.Conversation;

public interface ConversationRepository extends MongoRepository<Conversation, String> {

    @Query("{'$or': [{'user1': :#{#user1}, 'user2': :#{#user2}}, {'user1': :#{#user2}, 'user2': :#{#user1}}]}")
    Optional<Conversation> findConversationByUsers(@Param("user1") String user1, @Param("user2") String user2);

    // @Query(value = "{'$or': [{'user1': :#{#user1}, 'user2': :#{#user2}},
    // {'user1': :#{#user2}, 'user2': :#{#user1}}]}", fields = "{'messages': {
    // $slice: [:#{#pageable.offset},:#{#pageable.pageSize} ] }, 'user1': 1,
    // 'user2': 1}", sort = "{'messages.timestamp': 1}", count = true)
    // Optional<Conversation> findConversationByUsers(@Param("user1") String user1,
    // @Param("user2") String user2,
    // @Param("pageable") Pageable pageable);

    @Query("{'$or': [ {'user1': :#{#user}}, {'user2': :#{#user}} ] }")
    Optional<List<Conversation>> findConversationByUser(@Param("user") String user);

    // @Query("{'$or': [{'user1': :#{#user}}, {'user2': :#{#user}}]}")
    // Page<Conversation> findAllConversationsByUser(@Param("user") String user,
    // Pageable pageable);

    // @Query(value = "{'$or': [{'user1': :#{#user}}, {'user2': :#{#user}}]}", sort
    // = "{'messages.timestamp': 1}", fields = "{'messages': { $slice: [?0.offset,
    // ?0.pageSize] }}")
    // Page<Conversation> findConversationsWithOrderedMessages(@Param("user") String
    // user, Pageable pageable);

}
