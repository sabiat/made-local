DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES users(id),
  "message_text" VARCHAR(255),
  "created_at"  TIMESTAMP NOT NULL DEFAULT NOW(),
  "chat_id" INTEGER REFERENCES chats(id)
);