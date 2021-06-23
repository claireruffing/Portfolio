-- -- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --
DROP TABLE IF EXISTS mail;
DROP TABLE IF EXISTS emailuser;

CREATE TABLE mail(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), useremail VARCHAR(60), mailbox VARCHAR(32), mail jsonb);
CREATE TABLE emailuser(useremail VARCHAR(32), username VARCHAR(32), userpassword VARCHAR(60), avatarurl TEXT, showavatar BOOLEAN);
