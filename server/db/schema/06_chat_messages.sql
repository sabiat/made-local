DROP TABLE IF EXISTS chat_messages CASCADE;
CREATE TABLE "chat_messages" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES users(id),
  "message_text" VARCHAR(255),
  "created_at"  TIMESTAMP NOT NULL DEFAULT NOW(),
  "conversation_id" INTEGER REFERENCES conversations(id)
);