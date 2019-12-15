SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: test-organization; Type: SCHEMA; Schema: -; Owner: -
--



SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ar_internal_metadata; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: attendance_events; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE attendance_events (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    from_day date NOT NULL,
    to_day date,
    from_time time without time zone,
    to_time time without time zone,
    description character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: attendance_events_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE attendance_events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: attendance_events_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE attendance_events_id_seq OWNED BY attendance_events.id;


--
-- Name: board_lists; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE board_lists (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    ordinal_number integer,
    project_id bigint NOT NULL,
    deleted_at timestamp without time zone
);


--
-- Name: board_lists_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE board_lists_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: board_lists_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE board_lists_id_seq OWNED BY board_lists.id;


--
-- Name: comments; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE comments (
    id bigint NOT NULL,
    issue_id bigint,
    content text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id bigint
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE comments_id_seq OWNED BY comments.id;


--
-- Name: contact_avatars; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE contact_avatars (
    id bigint NOT NULL,
    file character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: contact_avatars_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE contact_avatars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contact_avatars_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE contact_avatars_id_seq OWNED BY contact_avatars.id;


--
-- Name: contacts; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE contacts (
    id bigint NOT NULL,
    name character varying,
    email character varying,
    description character varying,
    telephone character varying,
    mobile character varying,
    fax character varying,
    address_city character varying,
    address_zip character varying,
    address_street character varying,
    address_number character varying,
    address_country character varying,
    contact_avatar_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE contacts_id_seq OWNED BY contacts.id;


--
-- Name: document_files; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE document_files (
    id bigint NOT NULL,
    file character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    s3_id character varying,
    s3_parts character varying[] DEFAULT '{}'::character varying[] NOT NULL
);


--
-- Name: document_files_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE document_files_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: document_files_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE document_files_id_seq OWNED BY document_files.id;


--
-- Name: documents; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE documents (
    id bigint NOT NULL,
    name character varying NOT NULL,
    folder_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    document_file_id bigint NOT NULL
);


--
-- Name: documents_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE documents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: documents_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE documents_id_seq OWNED BY documents.id;


--
-- Name: events; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE events (
    id bigint NOT NULL,
    title character varying NOT NULL,
    all_day boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    start_time timestamp without time zone,
    end_time timestamp without time zone,
    description text
);


--
-- Name: events_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE events_id_seq OWNED BY events.id;


--
-- Name: folders; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE folders (
    id bigint NOT NULL,
    name character varying NOT NULL,
    folder_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: folders_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE folders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: folders_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE folders_id_seq OWNED BY folders.id;


--
-- Name: issues; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE issues (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    title character varying NOT NULL,
    description text,
    user_id bigint,
    complexity numeric(4,1),
    board_list_id integer NOT NULL,
    ordinal_number integer,
    deleted_at timestamp without time zone
);


--
-- Name: issues_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE issues_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: issues_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE issues_id_seq OWNED BY issues.id;


--
-- Name: organizations; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE organizations (
    id bigint NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    time_zone character varying NOT NULL,
    time_zone_seconds integer,
    subscription_id integer
);


--
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE organizations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE organizations_id_seq OWNED BY organizations.id;


--
-- Name: records; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE records (
    id bigint NOT NULL,
    start_time timestamp without time zone,
    end_time timestamp without time zone,
    user_id bigint,
    issue_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: project_record_days; Type: VIEW; Schema: test-organization; Owner: -
--

CREATE VIEW project_record_days AS
 SELECT ((records.start_time + ((organizations.time_zone_seconds)::double precision * '00:00:01'::interval)))::date AS day,
    board_lists.project_id
   FROM (((records
     JOIN issues ON ((issues.id = records.issue_id)))
     JOIN board_lists ON ((board_lists.id = issues.board_list_id)))
     JOIN public.organizations ON (((organizations.name)::name = "current_schema"())))
  GROUP BY (((records.start_time + ((organizations.time_zone_seconds)::double precision * '00:00:01'::interval)))::date), board_lists.project_id;


--
-- Name: projects; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE projects (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone
);


--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE projects_id_seq OWNED BY projects.id;


--
-- Name: record_days; Type: VIEW; Schema: test-organization; Owner: -
--

CREATE VIEW record_days AS
 SELECT ((records.start_time + ((organizations.time_zone_seconds)::double precision * '00:00:01'::interval)))::date AS day,
    records.user_id
   FROM (records
     JOIN public.organizations ON (((organizations.name)::name = "current_schema"())))
  GROUP BY (((records.start_time + ((organizations.time_zone_seconds)::double precision * '00:00:01'::interval)))::date), records.user_id;


--
-- Name: records_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE records_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: records_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE records_id_seq OWNED BY records.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE users (
    id bigint NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip inet,
    last_sign_in_ip inet,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    invitation_token character varying,
    invitation_created_at timestamp without time zone,
    invitation_sent_at timestamp without time zone,
    invitation_accepted_at timestamp without time zone,
    invitation_limit integer,
    invited_by_type character varying,
    invited_by_id bigint,
    invitations_count integer DEFAULT 0,
    firstname character varying,
    lastname character varying,
    gender integer,
    avatar character varying,
    selected_project_id integer,
    telephone_number character varying,
    type character varying NOT NULL
);


--
-- Name: user_issues; Type: VIEW; Schema: test-organization; Owner: -
--

CREATE VIEW user_issues AS
 SELECT users.id AS user_id,
    issues.id AS issue_id,
    sum((records.end_time - records.start_time)) AS spent_time,
    min(records.start_time) AS start_time
   FROM ((users
     JOIN records ON ((records.user_id = users.id)))
     JOIN issues ON ((issues.id = records.issue_id)))
  GROUP BY users.id, issues.id;


--
-- Name: user_projects; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE user_projects (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    project_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: user_projects_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE user_projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_projects_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE user_projects_id_seq OWNED BY user_projects.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: wiki_categories; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE wiki_categories (
    id bigint NOT NULL,
    title character varying,
    wiki_category_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: wiki_categories_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE wiki_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wiki_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE wiki_categories_id_seq OWNED BY wiki_categories.id;


--
-- Name: wiki_pages; Type: TABLE; Schema: test-organization; Owner: -
--

CREATE TABLE wiki_pages (
    id bigint NOT NULL,
    title character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    wiki_category_id bigint NOT NULL,
    content text
);


--
-- Name: wiki_pages_id_seq; Type: SEQUENCE; Schema: test-organization; Owner: -
--

CREATE SEQUENCE wiki_pages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wiki_pages_id_seq; Type: SEQUENCE OWNED BY; Schema: test-organization; Owner: -
--

ALTER SEQUENCE wiki_pages_id_seq OWNED BY wiki_pages.id;


--
-- Name: attendance_events id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY attendance_events ALTER COLUMN id SET DEFAULT nextval('attendance_events_id_seq'::regclass);


--
-- Name: board_lists id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY board_lists ALTER COLUMN id SET DEFAULT nextval('board_lists_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);


--
-- Name: contact_avatars id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY contact_avatars ALTER COLUMN id SET DEFAULT nextval('contact_avatars_id_seq'::regclass);


--
-- Name: contacts id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY contacts ALTER COLUMN id SET DEFAULT nextval('contacts_id_seq'::regclass);


--
-- Name: document_files id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY document_files ALTER COLUMN id SET DEFAULT nextval('document_files_id_seq'::regclass);


--
-- Name: documents id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY documents ALTER COLUMN id SET DEFAULT nextval('documents_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY events ALTER COLUMN id SET DEFAULT nextval('events_id_seq'::regclass);


--
-- Name: folders id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY folders ALTER COLUMN id SET DEFAULT nextval('folders_id_seq'::regclass);


--
-- Name: issues id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY issues ALTER COLUMN id SET DEFAULT nextval('issues_id_seq'::regclass);


--
-- Name: organizations id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY organizations ALTER COLUMN id SET DEFAULT nextval('organizations_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY projects ALTER COLUMN id SET DEFAULT nextval('projects_id_seq'::regclass);


--
-- Name: records id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY records ALTER COLUMN id SET DEFAULT nextval('records_id_seq'::regclass);


--
-- Name: user_projects id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY user_projects ALTER COLUMN id SET DEFAULT nextval('user_projects_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: wiki_categories id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY wiki_categories ALTER COLUMN id SET DEFAULT nextval('wiki_categories_id_seq'::regclass);


--
-- Name: wiki_pages id; Type: DEFAULT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY wiki_pages ALTER COLUMN id SET DEFAULT nextval('wiki_pages_id_seq'::regclass);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: attendance_events attendance_events_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY attendance_events
    ADD CONSTRAINT attendance_events_pkey PRIMARY KEY (id);


--
-- Name: board_lists board_lists_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY board_lists
    ADD CONSTRAINT board_lists_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: contact_avatars contact_avatars_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY contact_avatars
    ADD CONSTRAINT contact_avatars_pkey PRIMARY KEY (id);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: document_files document_files_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY document_files
    ADD CONSTRAINT document_files_pkey PRIMARY KEY (id);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: folders folders_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY folders
    ADD CONSTRAINT folders_pkey PRIMARY KEY (id);


--
-- Name: issues issues_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY issues
    ADD CONSTRAINT issues_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: records records_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY records
    ADD CONSTRAINT records_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: user_projects user_projects_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY user_projects
    ADD CONSTRAINT user_projects_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: wiki_categories wiki_categories_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY wiki_categories
    ADD CONSTRAINT wiki_categories_pkey PRIMARY KEY (id);


--
-- Name: wiki_pages wiki_pages_pkey; Type: CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY wiki_pages
    ADD CONSTRAINT wiki_pages_pkey PRIMARY KEY (id);


--
-- Name: index_attendance_events_on_user_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_attendance_events_on_user_id ON attendance_events USING btree (user_id);


--
-- Name: index_board_lists_on_deleted_at; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_board_lists_on_deleted_at ON board_lists USING btree (deleted_at);


--
-- Name: index_board_lists_on_project_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_board_lists_on_project_id ON board_lists USING btree (project_id);


--
-- Name: index_comments_on_issue_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_comments_on_issue_id ON comments USING btree (issue_id);


--
-- Name: index_comments_on_user_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_comments_on_user_id ON comments USING btree (user_id);


--
-- Name: index_contacts_on_contact_avatar_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_contacts_on_contact_avatar_id ON contacts USING btree (contact_avatar_id);


--
-- Name: index_documents_on_document_file_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_documents_on_document_file_id ON documents USING btree (document_file_id);


--
-- Name: index_documents_on_folder_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_documents_on_folder_id ON documents USING btree (folder_id);


--
-- Name: index_folders_on_folder_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_folders_on_folder_id ON folders USING btree (folder_id);


--
-- Name: index_issues_on_board_list_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_issues_on_board_list_id ON issues USING btree (board_list_id);


--
-- Name: index_issues_on_deleted_at; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_issues_on_deleted_at ON issues USING btree (deleted_at);


--
-- Name: index_issues_on_user_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_issues_on_user_id ON issues USING btree (user_id);


--
-- Name: index_organizations_on_name; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE UNIQUE INDEX index_organizations_on_name ON organizations USING btree (name);


--
-- Name: index_projects_on_deleted_at; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_projects_on_deleted_at ON projects USING btree (deleted_at);


--
-- Name: index_records_on_issue_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_records_on_issue_id ON records USING btree (issue_id);


--
-- Name: index_records_on_user_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_records_on_user_id ON records USING btree (user_id);


--
-- Name: index_user_projects_on_project_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_user_projects_on_project_id ON user_projects USING btree (project_id);


--
-- Name: index_user_projects_on_user_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_user_projects_on_user_id ON user_projects USING btree (user_id);


--
-- Name: index_users_on_email; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE UNIQUE INDEX index_users_on_email ON users USING btree (email);


--
-- Name: index_users_on_invitation_token; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE UNIQUE INDEX index_users_on_invitation_token ON users USING btree (invitation_token);


--
-- Name: index_users_on_invitations_count; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_users_on_invitations_count ON users USING btree (invitations_count);


--
-- Name: index_users_on_invited_by_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_users_on_invited_by_id ON users USING btree (invited_by_id);


--
-- Name: index_users_on_invited_by_type_and_invited_by_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_users_on_invited_by_type_and_invited_by_id ON users USING btree (invited_by_type, invited_by_id);


--
-- Name: index_users_on_reset_password_token; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE UNIQUE INDEX index_users_on_reset_password_token ON users USING btree (reset_password_token);


--
-- Name: index_users_on_selected_project_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_users_on_selected_project_id ON users USING btree (selected_project_id);


--
-- Name: index_wiki_categories_on_wiki_category_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_wiki_categories_on_wiki_category_id ON wiki_categories USING btree (wiki_category_id);


--
-- Name: index_wiki_pages_on_wiki_category_id; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE INDEX index_wiki_pages_on_wiki_category_id ON wiki_pages USING btree (wiki_category_id);


--
-- Name: unique_active_record_per_user; Type: INDEX; Schema: test-organization; Owner: -
--

CREATE UNIQUE INDEX unique_active_record_per_user ON records USING btree (user_id) WHERE (end_time IS NULL);


--
-- Name: comments fk_rails_03de2dc08c; Type: FK CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT fk_rails_03de2dc08c FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: issues fk_rails_14989b278a; Type: FK CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY issues
    ADD CONSTRAINT fk_rails_14989b278a FOREIGN KEY (board_list_id) REFERENCES board_lists(id);


--
-- Name: documents fk_rails_404da7ca3d; Type: FK CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY documents
    ADD CONSTRAINT fk_rails_404da7ca3d FOREIGN KEY (folder_id) REFERENCES folders(id);


--
-- Name: records fk_rails_6f771fa596; Type: FK CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY records
    ADD CONSTRAINT fk_rails_6f771fa596 FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE SET NULL;


--
-- Name: records fk_rails_9ba3ba9afc; Type: FK CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY records
    ADD CONSTRAINT fk_rails_9ba3ba9afc FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: board_lists fk_rails_c76f6a3cd9; Type: FK CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY board_lists
    ADD CONSTRAINT fk_rails_c76f6a3cd9 FOREIGN KEY (project_id) REFERENCES projects(id);


--
-- Name: users fk_rails_cbf756aaae; Type: FK CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT fk_rails_cbf756aaae FOREIGN KEY (selected_project_id) REFERENCES projects(id);


--
-- Name: attendance_events fk_rails_d39232abec; Type: FK CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY attendance_events
    ADD CONSTRAINT fk_rails_d39232abec FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: folders fk_rails_f5f7a22451; Type: FK CONSTRAINT; Schema: test-organization; Owner: -
--

ALTER TABLE ONLY folders
    ADD CONSTRAINT fk_rails_f5f7a22451 FOREIGN KEY (folder_id) REFERENCES folders(id);


--
-- PostgreSQL database dump complete
--

INSERT INTO "schema_migrations" (version) VALUES
('20181030184844'),
('20181118160714'),
('20181122194236'),
('20181122195042'),
('20181206180705'),
('20181208224113'),
('20181208224623'),
('20181208224833'),
('20190503200308'),
('20190607213618'),
('20190712213034'),
('20190819204007'),
('20190819204611'),
('20190907123907'),
('20190910193632'),
('20190910193903'),
('20191112235930'),
('20191215220930'),
('20191215221228');


