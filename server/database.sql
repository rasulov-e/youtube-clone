CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    avatar text COLLATE pg_catalog."default",
    hero text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public.videos
(
    id integer NOT NULL DEFAULT nextval('videos_id_seq'::regclass),
    url text COLLATE pg_catalog."default" NOT NULL,
    thumbnail text COLLATE pg_catalog."default" NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL,
    "user_id" integer,
    CONSTRAINT videos_pkey PRIMARY KEY (id),
)
