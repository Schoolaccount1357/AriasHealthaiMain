--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: nav_usage; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.nav_usage (
    id integer NOT NULL,
    nav_type text NOT NULL,
    value text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    user_agent text,
    ip_hash text,
    referrer text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.nav_usage OWNER TO neondb_owner;

--
-- Name: nav_usage_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.nav_usage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nav_usage_id_seq OWNER TO neondb_owner;

--
-- Name: nav_usage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.nav_usage_id_seq OWNED BY public.nav_usage.id;


--
-- Name: resource_usage; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.resource_usage (
    id integer NOT NULL,
    resource_type text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    user_agent text,
    ip_hash text,
    referrer text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.resource_usage OWNER TO neondb_owner;

--
-- Name: resource_usage_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.resource_usage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.resource_usage_id_seq OWNER TO neondb_owner;

--
-- Name: resource_usage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.resource_usage_id_seq OWNED BY public.resource_usage.id;


--
-- Name: security_logs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.security_logs (
    id integer NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    event_type character varying(50) NOT NULL,
    severity character varying(20) NOT NULL,
    ip_address character varying(50) NOT NULL,
    user_agent text,
    url text,
    message text,
    metadata json,
    country_code character varying(2),
    is_tor boolean DEFAULT false,
    is_proxy boolean DEFAULT false,
    ip_reputation integer,
    user_id integer,
    session_id character varying(255),
    resolved boolean DEFAULT false,
    resolved_by integer,
    resolved_at timestamp without time zone,
    notes text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.security_logs OWNER TO neondb_owner;

--
-- Name: security_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.security_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.security_logs_id_seq OWNER TO neondb_owner;

--
-- Name: security_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.security_logs_id_seq OWNED BY public.security_logs.id;


--
-- Name: state_resource_usage; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.state_resource_usage (
    id integer NOT NULL,
    state text NOT NULL,
    resource_name text NOT NULL,
    category text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    user_agent text,
    ip_hash text,
    referrer text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.state_resource_usage OWNER TO neondb_owner;

--
-- Name: state_resource_usage_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.state_resource_usage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.state_resource_usage_id_seq OWNER TO neondb_owner;

--
-- Name: state_resource_usage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.state_resource_usage_id_seq OWNED BY public.state_resource_usage.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: veterans; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.veterans (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    dob text NOT NULL,
    gender text NOT NULL,
    branch text,
    rank text,
    service_years text,
    deployment_count integer,
    suds_history text,
    treatment_history text,
    current_status text,
    mental_health_conditions text,
    communication_preference text,
    peer_preferences text,
    goals text,
    additional_info text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL
);


ALTER TABLE public.veterans OWNER TO neondb_owner;

--
-- Name: veterans_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.veterans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.veterans_id_seq OWNER TO neondb_owner;

--
-- Name: veterans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.veterans_id_seq OWNED BY public.veterans.id;


--
-- Name: visitor_activity_log; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.visitor_activity_log (
    id integer NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    ip_address character varying(50) NOT NULL,
    country_code character varying(2),
    country_name character varying(100),
    city character varying(100),
    user_agent text,
    browser character varying(50),
    operating_system character varying(50),
    device_type character varying(20),
    referrer text,
    landing_page text,
    page_viewed text,
    event_type character varying(50) NOT NULL,
    event_data jsonb,
    session_id character varying(255),
    user_id integer,
    is_bot_detected boolean DEFAULT false,
    bot_category character varying(50),
    bot_confidence integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.visitor_activity_log OWNER TO neondb_owner;

--
-- Name: visitor_activity_log_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.visitor_activity_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.visitor_activity_log_id_seq OWNER TO neondb_owner;

--
-- Name: visitor_activity_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.visitor_activity_log_id_seq OWNED BY public.visitor_activity_log.id;


--
-- Name: waitlist; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.waitlist (
    id integer NOT NULL,
    email text NOT NULL,
    first_name text,
    last_name text,
    service_status text NOT NULL,
    reason_for_interest text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    phone text,
    date_of_birth text,
    gender text,
    race text,
    ethnicity text,
    military_branch text,
    service_years text,
    deployment_history text,
    location text,
    zip_code text,
    education_level text,
    employment_status text,
    household_income text,
    substance_use_history text,
    mental_health_status text,
    previous_treatment text,
    communication_preferences text,
    support_group_preferences text,
    language_preference text,
    referral_source text
);


ALTER TABLE public.waitlist OWNER TO neondb_owner;

--
-- Name: waitlist_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.waitlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.waitlist_id_seq OWNER TO neondb_owner;

--
-- Name: waitlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.waitlist_id_seq OWNED BY public.waitlist.id;


--
-- Name: nav_usage id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.nav_usage ALTER COLUMN id SET DEFAULT nextval('public.nav_usage_id_seq'::regclass);


--
-- Name: resource_usage id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.resource_usage ALTER COLUMN id SET DEFAULT nextval('public.resource_usage_id_seq'::regclass);


--
-- Name: security_logs id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.security_logs ALTER COLUMN id SET DEFAULT nextval('public.security_logs_id_seq'::regclass);


--
-- Name: state_resource_usage id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.state_resource_usage ALTER COLUMN id SET DEFAULT nextval('public.state_resource_usage_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: veterans id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.veterans ALTER COLUMN id SET DEFAULT nextval('public.veterans_id_seq'::regclass);


--
-- Name: visitor_activity_log id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.visitor_activity_log ALTER COLUMN id SET DEFAULT nextval('public.visitor_activity_log_id_seq'::regclass);


--
-- Name: waitlist id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.waitlist ALTER COLUMN id SET DEFAULT nextval('public.waitlist_id_seq'::regclass);


--
-- Name: nav_usage nav_usage_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.nav_usage
    ADD CONSTRAINT nav_usage_pkey PRIMARY KEY (id);


--
-- Name: resource_usage resource_usage_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.resource_usage
    ADD CONSTRAINT resource_usage_pkey PRIMARY KEY (id);


--
-- Name: security_logs security_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.security_logs
    ADD CONSTRAINT security_logs_pkey PRIMARY KEY (id);


--
-- Name: state_resource_usage state_resource_usage_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.state_resource_usage
    ADD CONSTRAINT state_resource_usage_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: veterans veterans_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.veterans
    ADD CONSTRAINT veterans_pkey PRIMARY KEY (id);


--
-- Name: visitor_activity_log visitor_activity_log_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.visitor_activity_log
    ADD CONSTRAINT visitor_activity_log_pkey PRIMARY KEY (id);


--
-- Name: waitlist waitlist_email_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.waitlist
    ADD CONSTRAINT waitlist_email_unique UNIQUE (email);


--
-- Name: waitlist waitlist_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.waitlist
    ADD CONSTRAINT waitlist_pkey PRIMARY KEY (id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

