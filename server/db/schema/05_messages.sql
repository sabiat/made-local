DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int REFERENCES users(id),
  "message_text" varchar,
  "created_at"  TIMESTAMP NOT NULL DEFAULT NOW(),
  "chat_id" int REFERENCES chats(id)
);