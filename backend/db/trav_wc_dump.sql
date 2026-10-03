--
-- PostgreSQL database dump
--

\restrict re71CBF1UfcHdgNug06NXBEhzEdmCeoPU2Ywuv2cnSHh4L7PvZpZ26oZn06BKRn

-- Dumped from database version 16.15 (Ubuntu 16.15-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.15 (Ubuntu 16.15-0ubuntu0.24.04.1)

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

ALTER TABLE IF EXISTS ONLY public.citizen_requests DROP CONSTRAINT IF EXISTS citizen_requests_citizen_id_fkey;
ALTER TABLE IF EXISTS ONLY public.citizen_requests DROP CONSTRAINT IF EXISTS citizen_requests_assigned_agent_id_fkey;
DROP INDEX IF EXISTS public.ix_users_email;
DROP INDEX IF EXISTS public.ix_citizen_requests_status_created_at;
DROP INDEX IF EXISTS public.ix_citizen_requests_citizen_id;
DROP INDEX IF EXISTS public.ix_citizen_requests_category;
DROP INDEX IF EXISTS public.ix_citizen_requests_assigned_agent_id;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.citizen_requests DROP CONSTRAINT IF EXISTS citizen_requests_pkey;
ALTER TABLE IF EXISTS ONLY public.alembic_version DROP CONSTRAINT IF EXISTS alembic_version_pkc;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.citizen_requests;
DROP TABLE IF EXISTS public.alembic_version;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


--
-- Name: citizen_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.citizen_requests (
    id character varying(36) NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    category character varying(50) NOT NULL,
    priority character varying(20) NOT NULL,
    status character varying(20) NOT NULL,
    citizen_id character varying(36) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    location character varying(500) NOT NULL,
    assigned_agent_id character varying(36),
    resolved_at timestamp with time zone
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id character varying(36) NOT NULL,
    email character varying(320) NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL
);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alembic_version (version_num) FROM stdin;
462099655b53
\.


--
-- Data for Name: citizen_requests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.citizen_requests (id, title, description, category, priority, status, citizen_id, created_at, location, assigned_agent_id, resolved_at) FROM stdin;
1bde621e-5a49-4274-8b60-1231ee043b94	Dos d'âne demandé — Ambohipo	Les voitures roulent très vite devant l'école primaire, nous demandons l'installation d'un ralentisseur.	Voirie	Haute	Nouveau	24910357-2096-4c35-9fa3-72be064e888c	2026-09-25 08:39:54.272296+03	Ambohipo, cité universitaire	5bbc1b48-d8e4-4111-a925-15ae39910ba7	\N
2355cfd0-4276-4f3b-8e64-84aedfd40102	Trottoir effondré — Ambanidia	Une partie du trottoir s'est effondrée dans le caniveau, passage piéton impossible.	Voirie	Normale	Nouveau	b28d198e-efff-436d-8184-01a509b4d419	2026-09-28 12:20:27.083178+03	Ambanidia, route circulaire	\N	\N
678c0e00-d59d-4c32-bc4a-8bb184721f6e	Dépôt sauvage d'ordures — Ivandry	Un tas d'ordures s'accumule au coin de la rue, il attire les rats.	Déchets	Normale	Nouveau	8a4358a9-55f9-4507-8e07-abc93e3e0ad1	2026-09-26 15:02:16.461761+03	Ivandry, route des Hydrocarbures	\N	\N
03dd21fe-7d82-48ff-a9ec-85ed052ea5c8	Dépôt sauvage d'ordures — Ambohimanarina	Un tas d'ordures s'accumule au coin de la rue, il attire les rats.	Déchets	Basse	Nouveau	71f10e33-267d-41a6-93c8-957194172245	2026-09-30 11:14:39.624852+03	Ambohimanarina, gare	\N	\N
196e0ed4-09d1-406b-998c-25c15ddca1d9	Égout bouché — Tsaralalana	Le regard d'égout déborde et dégage une forte odeur.	Eau	Normale	En cours	74f0d92d-00d3-4c13-9c81-01cdd1c39b94	2026-09-29 03:47:49.62572+03	Tsaralalana, rue Ratsimilaho	be751630-427b-4401-9125-772f6074364f	\N
42999ad9-42e2-4d01-a656-94c05084e721	Bac à ordures plein — Tsaralalana	Le bac collectif n'a pas été vidé depuis plus d'une semaine.	Déchets	Normale	En cours	ddef79e7-b393-4627-8860-9395f9242434	2026-09-24 13:11:01.22706+03	Tsaralalana, rue Ratsimilaho	be751630-427b-4401-9125-772f6074364f	\N
72952596-a07e-45e1-b3d9-698de277a693	Nid-de-poule dangereux — Ampefiloha	Un grand nid-de-poule s'est formé au milieu de la chaussée, plusieurs motos ont déjà chuté.	Voirie	Urgente	Résolu	6d6daf86-e071-4ea8-9a76-e298a535c167	2026-09-12 23:23:29.120552+03	Ampefiloha, cité 67 Ha	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	2026-09-19 15:10:15.65466+03
61cacc6a-f686-4c94-be4d-d3bac567218a	Bac à ordures plein — Anosibe	Le bac collectif n'a pas été vidé depuis plus d'une semaine.	Déchets	Normale	En cours	8a4358a9-55f9-4507-8e07-abc93e3e0ad1	2026-09-02 02:22:09.741156+03	Anosibe, grand marché	5bbc1b48-d8e4-4111-a925-15ae39910ba7	\N
b2c5cc5e-fd40-473e-ba34-66d88a504f40	Déchets dans le canal — 67 Ha Nord	Le canal est obstrué par des sacs plastiques, risque d'inondation.	Déchets	Urgente	En attente	75862a37-a4b8-45c9-8d0a-80e7e890322c	2026-09-13 01:17:48.648509+03	67 Ha Nord, bloc 12	5bbc1b48-d8e4-4111-a925-15ae39910ba7	\N
585f6291-9a36-4544-b848-ad40b6239dec	Fuite d'eau sur la voie publique — Isoraka	Une canalisation fuit depuis trois jours, l'eau coule en permanence sur la route.	Eau	Basse	Résolu	8e3903d4-7308-4066-b328-b39cc82f065e	2026-09-29 21:46:20.697853+03	Isoraka, rue Ramelina	be751630-427b-4401-9125-772f6074364f	2026-09-30 12:13:29.705025+03
53cd2a7c-6ddf-44f2-9cab-d9c6243998aa	Gravats abandonnés — Itaosy	Des gravats de chantier ont été déposés sur le trottoir.	Déchets	Basse	Nouveau	6d6daf86-e071-4ea8-9a76-e298a535c167	2026-09-24 10:19:15.627532+03	Itaosy, route d'Arivonimamo	\N	\N
e2c8e6fc-ade3-4b51-95b5-ba78af44155a	Égout bouché — Anosibe	Le regard d'égout déborde et dégage une forte odeur.	Eau	Urgente	En cours	6d6daf86-e071-4ea8-9a76-e298a535c167	2026-09-29 22:04:44.002667+03	Anosibe, grand marché	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	\N
0b501349-ad84-4b5c-aeb5-85c350be3723	Bac à ordures plein — Itaosy	Le bac collectif n'a pas été vidé depuis plus d'une semaine.	Déchets	Basse	Résolu	24910357-2096-4c35-9fa3-72be064e888c	2026-09-17 14:19:44.463343+03	Itaosy, route d'Arivonimamo	be751630-427b-4401-9125-772f6074364f	2026-09-25 17:41:49.793448+03
2220f4f0-6e5c-45cc-a5ec-552076e3b6f2	Dépôt sauvage d'ordures — Isotry	Un tas d'ordures s'accumule au coin de la rue, il attire les rats.	Déchets	Normale	En cours	8a4358a9-55f9-4507-8e07-abc93e3e0ad1	2026-09-24 12:33:38.969378+03	Isotry, rue du marché	ad6466cc-1aa6-4fb9-8e53-6efe9223ccf9	\N
452d7835-f8c1-44de-8fa6-ab824841dd43	Herbes hautes dans le jardin public — Antaninarenina	Le jardin n'est plus entretenu, les herbes dépassent un mètre.	Espaces verts	Basse	Résolu	425c50bf-b53a-46ce-b496-2cd0947d5a0e	2026-08-18 00:25:34.101078+03	Antaninarenina, place de l'Indépendance	ca331bc5-abfb-4014-ad71-b35ae59f2a4a	2026-09-22 18:47:04.184424+03
709d88c6-b9e2-4158-9ce2-45a7ba13af49	Nuisances sonores — Andravoahangy	Un bar diffuse de la musique très fort tous les soirs jusqu'à 2h du matin.	Autre	Haute	En cours	6b4e90f8-9ec4-4c08-a894-e40dbbfa92ba	2026-08-18 15:08:14.833938+03	Andravoahangy, marché	ca331bc5-abfb-4014-ad71-b35ae59f2a4a	\N
560606ad-3143-4258-9b3e-f084d88e8463	Route inondée — Ivandry	La route est inondée à chaque pluie, l'eau ne s'évacue pas.	Voirie	Normale	Rejeté	cdc22b59-c322-4439-9d62-b4b391168394	2026-09-11 07:30:04.686235+03	Ivandry, route des Hydrocarbures	\N	\N
44d97883-d431-47e3-bcaa-420cc59ab14d	Nid-de-poule dangereux — Ambanidia	Un grand nid-de-poule s'est formé au milieu de la chaussée, plusieurs motos ont déjà chuté.	Voirie	Normale	Nouveau	8a4358a9-55f9-4507-8e07-abc93e3e0ad1	2026-09-26 21:47:29.2313+03	Ambanidia, route circulaire	be751630-427b-4401-9125-772f6074364f	\N
71a19d48-e16f-463f-89fa-eb66784ee965	Lampadaire éteint — Ambanidia	Le lampadaire devant le numéro 12 ne fonctionne plus depuis une semaine. La rue est totalement dans le noir le soir.	Éclairage public	Basse	Nouveau	6d6daf86-e071-4ea8-9a76-e298a535c167	2026-09-26 08:15:40.052181+03	Ambanidia, route circulaire	\N	\N
1403b8d1-bf1b-4f0b-8f25-84621b994708	Aire de jeux dégradée — Ampefiloha	La balançoire de l'aire de jeux est cassée.	Espaces verts	Normale	Résolu	8e3903d4-7308-4066-b328-b39cc82f065e	2026-09-22 11:00:24.065456+03	Ampefiloha, cité 67 Ha	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	2026-09-28 16:32:50.005686+03
a1c27a1f-e8c1-4d93-b798-fe489288eb81	Fuite d'eau sur la voie publique — Ambohimanarina	Une canalisation fuit depuis trois jours, l'eau coule en permanence sur la route.	Eau	Haute	Résolu	8a4358a9-55f9-4507-8e07-abc93e3e0ad1	2026-09-28 07:11:15.735684+03	Ambohimanarina, gare	be751630-427b-4401-9125-772f6074364f	2026-09-29 14:02:56.75637+03
c27eb597-4b8f-499c-8de5-6aa677d877b4	Dos d'âne demandé — Ankatso	Les voitures roulent très vite devant l'école primaire, nous demandons l'installation d'un ralentisseur.	Voirie	Basse	Nouveau	78d4b516-8271-4d77-8a89-ac21941721b5	2026-09-27 18:55:40.356726+03	Ankatso, campus	\N	\N
65907596-b63f-4dd8-ae7c-d0f4a638bfa0	Herbes hautes dans le jardin public — Isoraka	Le jardin n'est plus entretenu, les herbes dépassent un mètre.	Espaces verts	Haute	Résolu	75862a37-a4b8-45c9-8d0a-80e7e890322c	2026-09-30 22:10:12.260886+03	Isoraka, rue Ramelina	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	2026-10-01 00:30:12.04026+03
23e09370-434c-4184-8882-55b1e1bb22cd	Signalisation arrachée — Anosy	Le panneau stop à l'intersection a été arraché, risque d'accident.	Voirie	Normale	Résolu	78d4b516-8271-4d77-8a89-ac21941721b5	2026-09-23 14:50:28.684486+03	Anosy, bord du lac	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	2026-09-30 22:33:34.657937+03
eb48bcf2-b9ee-41bf-9c24-0ded10ce0ce0	Regard sans couvercle — Ambohipo	Un regard est ouvert sans couvercle sur le trottoir, quelqu'un pourrait tomber.	Sécurité	Basse	Résolu	71f10e33-267d-41a6-93c8-957194172245	2026-08-26 18:37:08.189748+03	Ambohipo, cité universitaire	be751630-427b-4401-9125-772f6074364f	2026-09-23 02:03:40.512002+03
51bd334f-4bc4-4b70-92e1-38772fed8002	Nid-de-poule dangereux — Faravohitra	Un grand nid-de-poule s'est formé au milieu de la chaussée, plusieurs motos ont déjà chuté.	Voirie	Normale	Résolu	47088a32-67f9-4054-be02-9e7f321a1543	2026-09-28 19:57:49.623546+03	Faravohitra, escaliers	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	2026-09-30 07:07:23.186428+03
104d03d9-c76c-497b-aefa-5d3e35764798	Fuite d'eau sur la voie publique — Itaosy	Une canalisation fuit depuis trois jours, l'eau coule en permanence sur la route.	Eau	Normale	Nouveau	cdc22b59-c322-4439-9d62-b4b391168394	2026-09-26 20:41:00.580114+03	Itaosy, route d'Arivonimamo	\N	\N
fb07dc69-c088-4596-be4a-2c5be949bd59	Affichage sauvage — Ampefiloha	Les murs de l'école sont couverts d'affiches collées illégalement.	Autre	Normale	En attente	edafcde5-e1d6-460c-b0f0-edafc3dc8f73	2026-09-30 10:52:34.248852+03	Ampefiloha, cité 67 Ha	be751630-427b-4401-9125-772f6074364f	\N
fefe32d1-35e9-4760-bc51-05aedf72712a	Route inondée — Anosy	La route est inondée à chaque pluie, l'eau ne s'évacue pas.	Voirie	Normale	Résolu	24910357-2096-4c35-9fa3-72be064e888c	2026-09-29 04:01:34.155316+03	Anosy, bord du lac	5bbc1b48-d8e4-4111-a925-15ae39910ba7	2026-09-30 12:55:45.105878+03
b4de47fe-4d2c-4417-b466-15aeae983032	Herbes hautes dans le jardin public — Analakely	Le jardin n'est plus entretenu, les herbes dépassent un mètre.	Espaces verts	Normale	En cours	edafcde5-e1d6-460c-b0f0-edafc3dc8f73	2026-08-17 04:51:54.823234+03	Analakely, avenue de l'Indépendance	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	\N
82cd23d9-48d7-416c-8149-314bb2671968	Route inondée — Antaninarenina	La route est inondée à chaque pluie, l'eau ne s'évacue pas.	Voirie	Normale	Résolu	78d4b516-8271-4d77-8a89-ac21941721b5	2026-09-29 22:08:52.528285+03	Antaninarenina, place de l'Indépendance	ca331bc5-abfb-4014-ad71-b35ae59f2a4a	2026-09-30 18:21:50.726332+03
7c9498fd-f03a-4b71-a414-6337323ea182	Dépôt sauvage d'ordures — Ambohimanarina	Un tas d'ordures s'accumule au coin de la rue, il attire les rats.	Déchets	Haute	Résolu	6b4e90f8-9ec4-4c08-a894-e40dbbfa92ba	2026-09-26 09:12:00.317684+03	Ambohimanarina, gare	5bbc1b48-d8e4-4111-a925-15ae39910ba7	2026-09-28 07:04:10.500232+03
d8c49a3d-9f6f-4c7d-b8db-f142250beb73	Égout bouché — Ankadifotsy	Le regard d'égout déborde et dégage une forte odeur.	Eau	Haute	En attente	edafcde5-e1d6-460c-b0f0-edafc3dc8f73	2026-09-21 20:45:51.462166+03	Ankadifotsy, rue Andriamasinavalona	be751630-427b-4401-9125-772f6074364f	\N
78ba6bfb-ee39-4394-90c8-3e47f2775c3f	Fuite d'eau sur la voie publique — Antaninarenina	Une canalisation fuit depuis trois jours, l'eau coule en permanence sur la route.	Eau	Haute	En attente	ddef79e7-b393-4627-8860-9395f9242434	2026-09-29 01:02:08.48262+03	Antaninarenina, place de l'Indépendance	ad6466cc-1aa6-4fb9-8e53-6efe9223ccf9	\N
15fc88cb-00de-4e47-a6f2-76d4b508f27b	Nuisances sonores — 67 Ha Nord	Un bar diffuse de la musique très fort tous les soirs jusqu'à 2h du matin.	Autre	Basse	En cours	6d6daf86-e071-4ea8-9a76-e298a535c167	2026-09-05 18:52:11.922251+03	67 Ha Nord, bloc 12	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	\N
19fb96f4-629f-4cbf-8402-4ab9095d57fd	Bac à ordures plein — Mahamasina	Le bac collectif n'a pas été vidé depuis plus d'une semaine.	Déchets	Basse	Nouveau	24910357-2096-4c35-9fa3-72be064e888c	2026-09-27 03:49:30.633984+03	Mahamasina, stade	\N	\N
e467c86f-15d0-4a07-9122-f47721c57ce5	Herbes hautes dans le jardin public — Ankorondrano	Le jardin n'est plus entretenu, les herbes dépassent un mètre.	Espaces verts	Haute	Nouveau	8e3903d4-7308-4066-b328-b39cc82f065e	2026-09-30 07:22:48.230108+03	Ankorondrano, rue Ravoninahitriniarivo	\N	\N
8d101b89-bc17-4c87-8bde-05d5fa63bf5d	Affichage sauvage — Behoririka	Les murs de l'école sont couverts d'affiches collées illégalement.	Autre	Basse	Résolu	6b4e90f8-9ec4-4c08-a894-e40dbbfa92ba	2026-09-29 21:20:56.743753+03	Behoririka, rue Rainitovo	5bbc1b48-d8e4-4111-a925-15ae39910ba7	2026-09-30 22:03:34.178782+03
1bb40238-0680-4562-a1ef-531e9458e449	Aire de jeux dégradée — Ambohimanarina	La balançoire de l'aire de jeux est cassée.	Espaces verts	Haute	Résolu	47088a32-67f9-4054-be02-9e7f321a1543	2026-09-19 00:29:57.213592+03	Ambohimanarina, gare	be751630-427b-4401-9125-772f6074364f	2026-09-22 11:02:50.918838+03
a5998f77-aa84-412e-b988-f5c460043e72	Borne-fontaine hors service — Ankatso	La borne-fontaine du quartier ne donne plus d'eau, les familles doivent marcher loin pour s'approvisionner.	Eau	Basse	En cours	8a4358a9-55f9-4507-8e07-abc93e3e0ad1	2026-08-22 19:37:13.84906+03	Ankatso, campus	5bbc1b48-d8e4-4111-a925-15ae39910ba7	\N
0d8341ac-4612-4755-9b4f-1193739d39a3	Route inondée — Antaninarenina	La route est inondée à chaque pluie, l'eau ne s'évacue pas.	Voirie	Normale	Rejeté	47088a32-67f9-4054-be02-9e7f321a1543	2026-09-26 12:52:49.656985+03	Antaninarenina, place de l'Indépendance	\N	\N
42a5f748-dc41-4300-ab2a-5a1c4038cad6	Fuite d'eau sur la voie publique — Ambohijatovo	Une canalisation fuit depuis trois jours, l'eau coule en permanence sur la route.	Eau	Normale	Résolu	24910357-2096-4c35-9fa3-72be064e888c	2026-09-26 23:06:37.14153+03	Ambohijatovo, jardin	ad6466cc-1aa6-4fb9-8e53-6efe9223ccf9	2026-09-27 21:36:12.202081+03
6220f5c6-fb9d-4e19-9b7f-9abcc53df5c8	Déchets dans le canal — Ambohipo	Le canal est obstrué par des sacs plastiques, risque d'inondation.	Déchets	Basse	En attente	b28d198e-efff-436d-8184-01a509b4d419	2026-09-28 07:56:11.614408+03	Ambohipo, cité universitaire	ca331bc5-abfb-4014-ad71-b35ae59f2a4a	\N
df09113b-72e1-4d06-aaae-f79bebc16165	Dépôt sauvage d'ordures — Itaosy	Un tas d'ordures s'accumule au coin de la rue, il attire les rats.	Déchets	Basse	Résolu	8e3903d4-7308-4066-b328-b39cc82f065e	2026-09-25 23:47:06.549012+03	Itaosy, route d'Arivonimamo	be751630-427b-4401-9125-772f6074364f	2026-09-29 23:13:23.523348+03
ee30181b-a346-49fd-acfc-5238c9e0cb3c	Poteau électrique penché — Isotry	Un poteau d'éclairage penche dangereusement après les fortes pluies.	Éclairage public	Normale	En cours	ddef79e7-b393-4627-8860-9395f9242434	2026-08-29 15:18:53.237897+03	Isotry, rue du marché	ad6466cc-1aa6-4fb9-8e53-6efe9223ccf9	\N
bf815add-f30a-46ef-9068-37989d6c6fae	Signalisation arrachée — Ampasampito	Le panneau stop à l'intersection a été arraché, risque d'accident.	Voirie	Haute	Nouveau	6d6daf86-e071-4ea8-9a76-e298a535c167	2026-09-28 02:00:51.869829+03	Ampasampito, bypass	\N	\N
9e470ae5-1014-45d4-b59c-a1886a25dab8	Poteau électrique penché — Ivandry	Un poteau d'éclairage penche dangereusement après les fortes pluies.	Éclairage public	Haute	En cours	74f0d92d-00d3-4c13-9c81-01cdd1c39b94	2026-09-29 00:26:52.396533+03	Ivandry, route des Hydrocarbures	f4b3d35a-2bab-4a3f-b911-5bb616c7d7e1	\N
994e757e-e4e5-4c15-b281-f5d419aff139	Gravats abandonnés — Ankatso	Des gravats de chantier ont été déposés sur le trottoir.	Déchets	Basse	En cours	cdc22b59-c322-4439-9d62-b4b391168394	2026-09-27 17:09:14.807257+03	Ankatso, campus	be751630-427b-4401-9125-772f6074364f	\N
b148f707-40da-44f9-a94c-5bc0fb16bb66	Dos d'âne demandé — Ambanidia	Les voitures roulent très vite devant l'école primaire, nous demandons l'installation d'un ralentisseur.	Voirie	Haute	Nouveau	75862a37-a4b8-45c9-8d0a-80e7e890322c	2026-09-20 10:59:28.701423+03	Ambanidia, route circulaire	\N	\N
0f8efaaf-36c7-4c70-b29d-35d315134ba8	Éclairage clignotant — Andoharanofotsy	Plusieurs lampadaires clignotent en continu, ça gêne les riverains la nuit.	Éclairage public	Normale	En attente	6b4e90f8-9ec4-4c08-a894-e40dbbfa92ba	2026-09-10 12:47:59.749833+03	Andoharanofotsy, RN7	be751630-427b-4401-9125-772f6074364f	\N
bdcbeb13-32ca-4dbb-a32b-b3247db7e77f	Gravats abandonnés — Ivandry	Des gravats de chantier ont été déposés sur le trottoir.	Déchets	Haute	Nouveau	cdc22b59-c322-4439-9d62-b4b391168394	2026-09-30 18:39:39.559574+03	Ivandry, route des Hydrocarbures	\N	\N
7e6db57e-9bc5-49d2-bd76-944c2ec5edfa	Bac à ordures plein — Tsaralalana	Le bac collectif n'a pas été vidé depuis plus d'une semaine.	Déchets	Haute	Résolu	425c50bf-b53a-46ce-b496-2cd0947d5a0e	2026-09-10 02:56:07.86127+03	Tsaralalana, rue Ratsimilaho	ca331bc5-abfb-4014-ad71-b35ae59f2a4a	2026-09-18 11:17:57.40721+03
03dc7441-1c12-4e43-a476-0de23104e907	Quartier sans éclairage — Ambohimanarina	Toute la ruelle est sans lumière depuis la coupure de mardi, les habitants ont peur de sortir le soir.	Éclairage public	Normale	En cours	6b4e90f8-9ec4-4c08-a894-e40dbbfa92ba	2026-09-28 19:20:36.00782+03	Ambohimanarina, gare	f4b3d35a-2bab-4a3f-b911-5bb616c7d7e1	\N
550e2f0d-6e77-4172-8f2e-3a905f9cf688	Aire de jeux dégradée — Mahamasina	La balançoire de l'aire de jeux est cassée.	Espaces verts	Normale	En cours	8a4358a9-55f9-4507-8e07-abc93e3e0ad1	2026-09-24 23:55:05.691058+03	Mahamasina, stade	f4b3d35a-2bab-4a3f-b911-5bb616c7d7e1	\N
d0143c8e-1938-4347-8e09-53bbe2bfc8e2	Regard sans couvercle — Itaosy	Un regard est ouvert sans couvercle sur le trottoir, quelqu'un pourrait tomber.	Sécurité	Normale	En cours	71f10e33-267d-41a6-93c8-957194172245	2026-09-27 22:45:02.868088+03	Itaosy, route d'Arivonimamo	be751630-427b-4401-9125-772f6074364f	\N
b8adb943-1785-480c-b101-bafed3cffacb	Dos d'âne demandé — Antaninarenina	Les voitures roulent très vite devant l'école primaire, nous demandons l'installation d'un ralentisseur.	Voirie	Basse	Nouveau	8e3903d4-7308-4066-b328-b39cc82f065e	2026-09-26 04:03:56.966017+03	Antaninarenina, place de l'Indépendance	\N	\N
ffd53cd6-2357-451b-8d55-7528015f3b20	Signalisation arrachée — Ambohipo	Le panneau stop à l'intersection a été arraché, risque d'accident.	Voirie	Urgente	Nouveau	b28d198e-efff-436d-8184-01a509b4d419	2026-09-13 12:00:51.964846+03	Ambohipo, cité universitaire	\N	\N
e914b777-e9b4-46e8-bcfa-53b401654a11	Arbre prêt à tomber — Andoharanofotsy	Un gros arbre penche au-dessus des habitations et de la route.	Sécurité	Urgente	Nouveau	8e3903d4-7308-4066-b328-b39cc82f065e	2026-09-25 18:03:56.056859+03	Andoharanofotsy, RN7	\N	\N
24d9f4b2-0e19-4431-bfc4-4988eb9d786b	Borne-fontaine hors service — Andoharanofotsy	La borne-fontaine du quartier ne donne plus d'eau, les familles doivent marcher loin pour s'approvisionner.	Eau	Haute	Nouveau	8e3903d4-7308-4066-b328-b39cc82f065e	2026-09-30 19:46:23.601391+03	Andoharanofotsy, RN7	\N	\N
bf6b9ebf-52e8-4a1f-ad1d-b0b63597dbdf	Gravats abandonnés — Behoririka	Des gravats de chantier ont été déposés sur le trottoir.	Déchets	Normale	Rejeté	ddef79e7-b393-4627-8860-9395f9242434	2026-09-24 16:17:07.236403+03	Behoririka, rue Rainitovo	\N	\N
c18a846e-b615-435f-907e-2ec76ad8c6b3	Quartier sans éclairage — Behoririka	Toute la ruelle est sans lumière depuis la coupure de mardi, les habitants ont peur de sortir le soir.	Éclairage public	Normale	Résolu	78d4b516-8271-4d77-8a89-ac21941721b5	2026-09-29 04:56:35.273837+03	Behoririka, rue Rainitovo	ad6466cc-1aa6-4fb9-8e53-6efe9223ccf9	2026-09-29 21:05:06.314729+03
e8bf4e94-439c-45ca-b68d-f4d1203e5b53	Branches à élaguer — Ambohipo	Des branches touchent les fils électriques le long de l'allée.	Espaces verts	Urgente	Nouveau	24910357-2096-4c35-9fa3-72be064e888c	2026-09-30 21:23:34.800487+03	Ambohipo, cité universitaire	\N	\N
a2b10ad2-5ba1-441e-a6cf-237f7827e0d1	Nid-de-poule dangereux — Anosibe	Un grand nid-de-poule s'est formé au milieu de la chaussée, plusieurs motos ont déjà chuté.	Voirie	Normale	Nouveau	8a4358a9-55f9-4507-8e07-abc93e3e0ad1	2026-09-29 07:06:20.870397+03	Anosibe, grand marché	\N	\N
3a5a5189-d9dd-47a9-b559-e527ef3a93b1	Lampadaire éteint — Faravohitra	Le lampadaire devant le numéro 12 ne fonctionne plus depuis une semaine. La rue est totalement dans le noir le soir.	Éclairage public	Normale	Rejeté	74f0d92d-00d3-4c13-9c81-01cdd1c39b94	2026-09-29 05:36:01.624814+03	Faravohitra, escaliers	\N	\N
717a3c70-46c5-4d5b-a1f0-43c340f26ff6	Dépôt sauvage d'ordures — Tsaralalana	Un tas d'ordures s'accumule au coin de la rue, il attire les rats.	Déchets	Normale	Rejeté	ddef79e7-b393-4627-8860-9395f9242434	2026-09-30 20:20:07.500754+03	Tsaralalana, rue Ratsimilaho	\N	\N
79b783e3-89fc-4a37-b545-8e18689a2618	Aire de jeux dégradée — Ivandry	La balançoire de l'aire de jeux est cassée.	Espaces verts	Haute	Rejeté	8a4358a9-55f9-4507-8e07-abc93e3e0ad1	2026-09-26 21:10:37.026011+03	Ivandry, route des Hydrocarbures	\N	\N
c16d1ea5-7f9e-4983-8e50-4890b570a53d	Poteau électrique penché — Ambohimanarina	Un poteau d'éclairage penche dangereusement après les fortes pluies.	Éclairage public	Normale	En attente	8e3903d4-7308-4066-b328-b39cc82f065e	2026-09-24 03:21:48.748699+03	Ambohimanarina, gare	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	\N
5bbcaa3b-b0bc-4993-be48-d6e16553de7b	Dépôt sauvage d'ordures — Itaosy	Un tas d'ordures s'accumule au coin de la rue, il attire les rats.	Déchets	Basse	En attente	24910357-2096-4c35-9fa3-72be064e888c	2026-09-28 02:04:46.286034+03	Itaosy, route d'Arivonimamo	f4b3d35a-2bab-4a3f-b911-5bb616c7d7e1	\N
6d8ce2ae-8a0f-46a7-8dfe-48ecbaecc574	Gravats abandonnés — Ampasampito	Des gravats de chantier ont été déposés sur le trottoir.	Déchets	Normale	Nouveau	6d6daf86-e071-4ea8-9a76-e298a535c167	2026-09-27 08:59:45.379947+03	Ampasampito, bypass	\N	\N
298b39dc-e805-466b-ba18-d028dab629a0	Eau trouble au robinet — Ankatso	L'eau du réseau est marron depuis hier matin dans plusieurs maisons.	Eau	Haute	En cours	cdc22b59-c322-4439-9d62-b4b391168394	2026-09-18 22:46:55.96056+03	Ankatso, campus	5bbc1b48-d8e4-4111-a925-15ae39910ba7	\N
58842d79-fc6f-4ecc-b35f-065ec61c4e2f	Signalisation arrachée — Ampefiloha	Le panneau stop à l'intersection a été arraché, risque d'accident.	Voirie	Haute	Résolu	75862a37-a4b8-45c9-8d0a-80e7e890322c	2026-09-26 08:23:37.42557+03	Ampefiloha, cité 67 Ha	ad6466cc-1aa6-4fb9-8e53-6efe9223ccf9	2026-09-27 09:25:20.106318+03
95cf3f9f-7738-4413-825f-d86838f4315a	Égout bouché — Andravoahangy	Le regard d'égout déborde et dégage une forte odeur.	Eau	Normale	En cours	edafcde5-e1d6-460c-b0f0-edafc3dc8f73	2026-08-30 11:22:15.391203+03	Andravoahangy, marché	ad6466cc-1aa6-4fb9-8e53-6efe9223ccf9	\N
0846def8-94a1-4e88-ae4f-bbab346f90cf	Nuisances sonores — Ampefiloha	Un bar diffuse de la musique très fort tous les soirs jusqu'à 2h du matin.	Autre	Haute	Résolu	425c50bf-b53a-46ce-b496-2cd0947d5a0e	2026-09-25 17:16:39.830069+03	Ampefiloha, cité 67 Ha	be751630-427b-4401-9125-772f6074364f	2026-09-28 19:15:52.846127+03
1480ff9d-c149-428b-bdac-230119f113bf	Câble électrique à terre — Ankadifotsy	Un câble est tombé sur le trottoir après l'orage, danger immédiat pour les enfants.	Sécurité	Normale	Nouveau	edafcde5-e1d6-460c-b0f0-edafc3dc8f73	2026-09-17 05:56:48.767349+03	Ankadifotsy, rue Andriamasinavalona	\N	\N
93ad7514-1b1b-49ff-b82c-5d58c09d4065	Dos d'âne demandé — Ambanidia	Les voitures roulent très vite devant l'école primaire, nous demandons l'installation d'un ralentisseur.	Voirie	Basse	En cours	8a4358a9-55f9-4507-8e07-abc93e3e0ad1	2026-09-28 21:08:12.227327+03	Ambanidia, route circulaire	5bbc1b48-d8e4-4111-a925-15ae39910ba7	\N
933e22ec-d5d6-48fe-bd59-35c8eb903069	Dos d'âne demandé — Ampasampito	Les voitures roulent très vite devant l'école primaire, nous demandons l'installation d'un ralentisseur.	Voirie	Urgente	Nouveau	edafcde5-e1d6-460c-b0f0-edafc3dc8f73	2026-09-27 15:18:14.506949+03	Ampasampito, bypass	\N	\N
7f1e03d4-0923-4440-b7d7-020cbe22a2a6	Dépôt sauvage d'ordures — Anosy	Un tas d'ordures s'accumule au coin de la rue, il attire les rats.	Déchets	Basse	Nouveau	b28d198e-efff-436d-8184-01a509b4d419	2026-09-28 21:52:06.374801+03	Anosy, bord du lac	\N	\N
10a3247e-73ad-437c-b870-fc00b2c52bcd	Affichage sauvage — Ankadifotsy	Les murs de l'école sont couverts d'affiches collées illégalement.	Autre	Basse	Résolu	71f10e33-267d-41a6-93c8-957194172245	2026-09-24 22:44:52.48039+03	Ankadifotsy, rue Andriamasinavalona	f4b3d35a-2bab-4a3f-b911-5bb616c7d7e1	2026-09-26 15:54:08.492897+03
787368aa-46f3-4d6a-8f9b-749943c03796	Eau trouble au robinet — Ambanidia	L'eau du réseau est marron depuis hier matin dans plusieurs maisons.	Eau	Haute	Nouveau	8e3903d4-7308-4066-b328-b39cc82f065e	2026-09-24 10:33:02.54917+03	Ambanidia, route circulaire	\N	\N
50e8e612-2c7f-43c3-89f7-29f4b3fc748a	Fuite d'eau sur la voie publique — Behoririka	Une canalisation fuit depuis trois jours, l'eau coule en permanence sur la route.	Eau	Basse	Nouveau	78d4b516-8271-4d77-8a89-ac21941721b5	2026-09-28 21:36:18.094933+03	Behoririka, rue Rainitovo	\N	\N
27c2bc25-411f-4f59-8efc-78c5bc89da2c	Dos d'âne demandé — Isotry	Les voitures roulent très vite devant l'école primaire, nous demandons l'installation d'un ralentisseur.	Voirie	Haute	Nouveau	8e3903d4-7308-4066-b328-b39cc82f065e	2026-09-27 20:57:46.66413+03	Isotry, rue du marché	\N	\N
49a37ed5-38ea-49dd-a105-45394e5702fb	Dos d'âne demandé — Isoraka	Les voitures roulent très vite devant l'école primaire, nous demandons l'installation d'un ralentisseur.	Voirie	Normale	En attente	71f10e33-267d-41a6-93c8-957194172245	2026-08-19 09:15:07.11363+03	Isoraka, rue Ramelina	5bbc1b48-d8e4-4111-a925-15ae39910ba7	\N
1fee9d59-cc64-4af4-bd7e-91259bbb274c	Bac à ordures plein — Ampefiloha	Le bac collectif n'a pas été vidé depuis plus d'une semaine.	Déchets	Normale	Nouveau	71f10e33-267d-41a6-93c8-957194172245	2026-10-01 00:11:59.535465+03	Ampefiloha, cité 67 Ha	\N	\N
55f3a89e-5c58-4836-92cb-0e5854ef0afa	Poteau électrique penché — Ampasampito	Un poteau d'éclairage penche dangereusement après les fortes pluies.	Éclairage public	Normale	Nouveau	78d4b516-8271-4d77-8a89-ac21941721b5	2026-09-27 19:46:30.905018+03	Ampasampito, bypass	\N	\N
a52f8820-84f2-469c-bb7e-6870a16195be	Bac à ordures plein — Ambohipo	Le bac collectif n'a pas été vidé depuis plus d'une semaine.	Déchets	Basse	Nouveau	b28d198e-efff-436d-8184-01a509b4d419	2026-09-29 23:37:09.022725+03	Ambohipo, cité universitaire	\N	\N
cb969d6f-b8fa-4a5f-8bd8-d78c908049f7	Poteau électrique penché — Isotry	Un poteau d'éclairage penche dangereusement après les fortes pluies.	Éclairage public	Normale	Résolu	8e3903d4-7308-4066-b328-b39cc82f065e	2026-09-29 00:09:46.128688+03	Isotry, rue du marché	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	2026-09-30 04:02:26.081376+03
53a56f47-6192-4900-ae64-2fa21716e255	Affichage sauvage — Mahamasina	Les murs de l'école sont couverts d'affiches collées illégalement.	Autre	Haute	En cours	74f0d92d-00d3-4c13-9c81-01cdd1c39b94	2026-09-30 17:57:10.010221+03	Mahamasina, stade	f4b3d35a-2bab-4a3f-b911-5bb616c7d7e1	\N
f02a3db1-4e63-4a18-95c1-6adaa0fb7f74	Nid-de-poule dangereux — Ampefiloha	Un grand nid-de-poule s'est formé au milieu de la chaussée, plusieurs motos ont déjà chuté.	Voirie	Urgente	Rejeté	78d4b516-8271-4d77-8a89-ac21941721b5	2026-09-05 03:26:03.675848+03	Ampefiloha, cité 67 Ha	\N	\N
9e65a65f-08f4-429f-8a45-62a3ebc52e4a	Déchets dans le canal — Faravohitra	Le canal est obstrué par des sacs plastiques, risque d'inondation.	Déchets	Urgente	Nouveau	75862a37-a4b8-45c9-8d0a-80e7e890322c	2026-09-09 20:30:30.611693+03	Faravohitra, escaliers	\N	\N
5aa2702b-9357-44e9-b983-62f7f7641242	Animaux errants — Anosibe	Une meute de chiens errants effraie les passants près de l'arrêt de bus.	Autre	Haute	Résolu	47088a32-67f9-4054-be02-9e7f321a1543	2026-09-09 21:02:17.396889+03	Anosibe, grand marché	f4b3d35a-2bab-4a3f-b911-5bb616c7d7e1	2026-09-19 17:54:47.797697+03
5075fb9c-8e55-4d54-9faa-f70346508813	Quartier sans éclairage — Ampasampito	Toute la ruelle est sans lumière depuis la coupure de mardi, les habitants ont peur de sortir le soir.	Éclairage public	Basse	En cours	cdc22b59-c322-4439-9d62-b4b391168394	2026-09-13 00:09:39.44578+03	Ampasampito, bypass	ca331bc5-abfb-4014-ad71-b35ae59f2a4a	\N
ca00220a-d24a-4321-8b9c-21cd4c594c3a	Route inondée — Ambohijatovo	La route est inondée à chaque pluie, l'eau ne s'évacue pas.	Voirie	Urgente	Rejeté	ddef79e7-b393-4627-8860-9395f9242434	2026-09-27 10:11:49.999086+03	Ambohijatovo, jardin	\N	\N
bc95412f-ff79-40aa-bbd8-6f45871e1932	Aire de jeux dégradée — Ambohipo	La balançoire de l'aire de jeux est cassée.	Espaces verts	Normale	Nouveau	b28d198e-efff-436d-8184-01a509b4d419	2026-09-26 16:02:48.846345+03	Ambohipo, cité universitaire	\N	\N
d4bce1ff-5d78-43e4-a5cc-bdd4f71ec479	Dos d'âne demandé — Behoririka	Les voitures roulent très vite devant l'école primaire, nous demandons l'installation d'un ralentisseur.	Voirie	Normale	Résolu	78d4b516-8271-4d77-8a89-ac21941721b5	2026-09-26 03:20:36.194882+03	Behoririka, rue Rainitovo	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	2026-09-27 05:30:49.808199+03
a25a1194-a6b6-46ff-866c-1d8fe42efb1b	Trottoir effondré — Ankadifotsy	Une partie du trottoir s'est effondrée dans le caniveau, passage piéton impossible.	Voirie	Normale	En attente	cdc22b59-c322-4439-9d62-b4b391168394	2026-09-30 08:59:24.88756+03	Ankadifotsy, rue Andriamasinavalona	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	\N
5e93da09-b3e1-403f-a9d2-2da76fd736cd	Bac à ordures plein — Andoharanofotsy	Le bac collectif n'a pas été vidé depuis plus d'une semaine.	Déchets	Normale	Rejeté	425c50bf-b53a-46ce-b496-2cd0947d5a0e	2026-09-26 02:08:24.858716+03	Andoharanofotsy, RN7	\N	\N
8aaee0be-05cc-4bbe-8ebc-5cc21141be05	Nuisances sonores — Ankatso	Un bar diffuse de la musique très fort tous les soirs jusqu'à 2h du matin.	Autre	Haute	En attente	75862a37-a4b8-45c9-8d0a-80e7e890322c	2026-09-24 13:46:31.955416+03	Ankatso, campus	ca331bc5-abfb-4014-ad71-b35ae59f2a4a	\N
55ead5f8-c54e-4a4e-87ac-baa404771622	Branches à élaguer — Ambohipo	Des branches touchent les fils électriques le long de l'allée.	Espaces verts	Normale	En cours	71f10e33-267d-41a6-93c8-957194172245	2026-09-19 00:06:10.498491+03	Ambohipo, cité universitaire	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	\N
e8458c7f-4f8c-487e-b1e7-8b648c6d3952	Arbre prêt à tomber — Behoririka	Un gros arbre penche au-dessus des habitations et de la route.	Sécurité	Normale	En cours	6d6daf86-e071-4ea8-9a76-e298a535c167	2026-09-28 16:47:58.127281+03	Behoririka, rue Rainitovo	ca331bc5-abfb-4014-ad71-b35ae59f2a4a	\N
c9020184-8668-494f-ac0e-77be40c5b8cd	Trottoir effondré — Ampasampito	Une partie du trottoir s'est effondrée dans le caniveau, passage piéton impossible.	Voirie	Normale	Nouveau	425c50bf-b53a-46ce-b496-2cd0947d5a0e	2026-09-25 00:50:21.164618+03	Ampasampito, bypass	\N	\N
bd457bae-61a9-449b-b2d4-b4d3ab22ee47	Gravats abandonnés — Ivandry	Des gravats de chantier ont été déposés sur le trottoir.	Déchets	Basse	Rejeté	b28d198e-efff-436d-8184-01a509b4d419	2026-09-01 16:28:07.935049+03	Ivandry, route des Hydrocarbures	\N	\N
81a86c30-bdcc-4dc1-b25c-e0efa2bd5cc6	Poteau électrique penché — Ambohijatovo	Un poteau d'éclairage penche dangereusement après les fortes pluies.	Éclairage public	Basse	Résolu	47088a32-67f9-4054-be02-9e7f321a1543	2026-09-27 08:17:22.595194+03	Ambohijatovo, jardin	f4b3d35a-2bab-4a3f-b911-5bb616c7d7e1	2026-09-28 03:02:47.236649+03
814ba925-7fc8-4227-a61d-ebe8253162ae	Bac à ordures plein — Antaninarenina	Le bac collectif n'a pas été vidé depuis plus d'une semaine.	Déchets	Normale	En cours	cdc22b59-c322-4439-9d62-b4b391168394	2026-09-15 19:00:11.734503+03	Antaninarenina, place de l'Indépendance	be751630-427b-4401-9125-772f6074364f	\N
77057b3e-89da-4434-bdf7-4f28fc4a6e76	Arbre prêt à tomber — Ambanidia	Un gros arbre penche au-dessus des habitations et de la route.	Sécurité	Basse	En attente	cdc22b59-c322-4439-9d62-b4b391168394	2026-09-09 01:39:57.989298+03	Ambanidia, route circulaire	ca331bc5-abfb-4014-ad71-b35ae59f2a4a	\N
4c3b7217-1847-403f-bfa1-2fe7ae907b1b	Route inondée — Ampefiloha	La route est inondée à chaque pluie, l'eau ne s'évacue pas.	Voirie	Basse	Résolu	75862a37-a4b8-45c9-8d0a-80e7e890322c	2026-09-30 08:06:39.409658+03	Ampefiloha, cité 67 Ha	be751630-427b-4401-9125-772f6074364f	2026-09-30 20:43:53.918825+03
1ef19bb2-4099-441c-8470-9a4384c70902	Dépôt sauvage d'ordures — Isoraka	Un tas d'ordures s'accumule au coin de la rue, il attire les rats.	Déchets	Basse	En cours	edafcde5-e1d6-460c-b0f0-edafc3dc8f73	2026-09-28 12:25:39.183072+03	Isoraka, rue Ramelina	f4b3d35a-2bab-4a3f-b911-5bb616c7d7e1	\N
7ba84239-8d8b-460e-8376-f48be04df9d5	Trottoir effondré — Tsaralalana	Une partie du trottoir s'est effondrée dans le caniveau, passage piéton impossible.	Voirie	Normale	Nouveau	74f0d92d-00d3-4c13-9c81-01cdd1c39b94	2026-09-13 19:30:05.579473+03	Tsaralalana, rue Ratsimilaho	\N	\N
1c870c1e-33ce-48be-bf97-e5c7dc4bfee1	Quartier sans éclairage — Anosibe	Toute la ruelle est sans lumière depuis la coupure de mardi, les habitants ont peur de sortir le soir.	Éclairage public	Urgente	Nouveau	ddef79e7-b393-4627-8860-9395f9242434	2026-09-30 23:04:14.245951+03	Anosibe, grand marché	\N	\N
42421adb-93dc-4739-b7c0-c8c099e6c89c	Fuite d'eau sur la voie publique — Ankatso	Une canalisation fuit depuis trois jours, l'eau coule en permanence sur la route.	Eau	Urgente	Rejeté	6b4e90f8-9ec4-4c08-a894-e40dbbfa92ba	2026-09-17 13:33:46.091902+03	Ankatso, campus	\N	\N
84541ad7-74bc-41b9-b187-29600eb3da3c	Route inondée — Anosy	La route est inondée à chaque pluie, l'eau ne s'évacue pas.	Voirie	Normale	Rejeté	24910357-2096-4c35-9fa3-72be064e888c	2026-09-26 05:27:49.908757+03	Anosy, bord du lac	\N	\N
2a267691-6fb7-4d22-b56e-f0ad340d4391	Égout bouché — Analakely	Le regard d'égout déborde et dégage une forte odeur.	Eau	Normale	Rejeté	ddef79e7-b393-4627-8860-9395f9242434	2026-09-18 16:12:38.094362+03	Analakely, avenue de l'Indépendance	\N	\N
3d8080f4-3b82-4f2c-bf46-2d6f1a8feb9b	Dépôt sauvage d'ordures — Isotry	Un tas d'ordures s'accumule au coin de la rue, il attire les rats.	Déchets	Normale	Résolu	ddef79e7-b393-4627-8860-9395f9242434	2026-08-21 09:28:46.849562+03	Isotry, rue du marché	5bbc1b48-d8e4-4111-a925-15ae39910ba7	2026-09-18 06:06:24.272363+03
0503b358-f681-4e2e-ba01-719788d3b5d5	Route inondée — Ambohimanarina	La route est inondée à chaque pluie, l'eau ne s'évacue pas.	Voirie	Urgente	Résolu	ddef79e7-b393-4627-8860-9395f9242434	2026-08-31 09:19:33.206315+03	Ambohimanarina, gare	5bbc1b48-d8e4-4111-a925-15ae39910ba7	2026-09-21 21:57:47.042735+03
4b0e40ac-202e-4350-9faa-7f1aeeb50742	Quartier sans éclairage — Isoraka	Toute la ruelle est sans lumière depuis la coupure de mardi, les habitants ont peur de sortir le soir.	Éclairage public	Normale	En attente	8e3903d4-7308-4066-b328-b39cc82f065e	2026-09-26 23:18:19.247594+03	Isoraka, rue Ramelina	ad6466cc-1aa6-4fb9-8e53-6efe9223ccf9	\N
75a7aed7-984a-433e-9539-6c622e3d8557	Éclairage clignotant — Mahamasina	Plusieurs lampadaires clignotent en continu, ça gêne les riverains la nuit.	Éclairage public	Normale	Résolu	47088a32-67f9-4054-be02-9e7f321a1543	2026-09-27 12:20:52.340277+03	Mahamasina, stade	ad6466cc-1aa6-4fb9-8e53-6efe9223ccf9	2026-09-30 13:12:58.534811+03
ebb83408-7e3e-4ff9-91be-8b6c97c8f07f	Animaux errants — 67 Ha Nord	Une meute de chiens errants effraie les passants près de l'arrêt de bus.	Autre	Urgente	Résolu	47088a32-67f9-4054-be02-9e7f321a1543	2026-09-09 22:51:05.372636+03	67 Ha Nord, bloc 12	b7f877ef-64b5-4214-a42f-e58b97c7ccd7	2026-09-16 12:58:00.316081+03
cee4ef0d-2449-4356-b224-0e1ff487d920	Gravats abandonnés — Mahamasina	Des gravats de chantier ont été déposés sur le trottoir.	Déchets	Basse	En cours	24910357-2096-4c35-9fa3-72be064e888c	2026-09-30 09:37:02.081463+03	Mahamasina, stade	ca331bc5-abfb-4014-ad71-b35ae59f2a4a	\N
ce1cd7df-9acd-4839-ba7c-a043f0874c03	Déchets dans le canal — Faravohitra	Le canal est obstrué par des sacs plastiques, risque d'inondation.	Déchets	Normale	En cours	b28d198e-efff-436d-8184-01a509b4d419	2026-09-14 07:27:28.296245+03	Faravohitra, escaliers	be751630-427b-4401-9125-772f6074364f	\N
97d39bf6-d0d7-4062-b101-103a0125c116	Déchets dans le canal — Isotry	Le canal est obstrué par des sacs plastiques, risque d'inondation.	Déchets	Normale	Nouveau	8e3903d4-7308-4066-b328-b39cc82f065e	2026-09-25 06:14:30.095974+03	Isotry, rue du marché	\N	\N
c17e7fd9-6400-42ed-b148-5a46c9ea7d43	Lampadaire éteint — Isoraka	Le lampadaire devant le numéro 12 ne fonctionne plus depuis une semaine. La rue est totalement dans le noir le soir.	Éclairage public	Basse	En cours	425c50bf-b53a-46ce-b496-2cd0947d5a0e	2026-09-30 08:19:16.091729+03	Isoraka, rue Ramelina	ca331bc5-abfb-4014-ad71-b35ae59f2a4a	\N
566f90e5-76d2-415f-8382-f517b14e22e2	Dos d'âne demandé — Ambohipo	Les voitures roulent très vite devant l'école primaire, nous demandons l'installation d'un ralentisseur.	Voirie	Basse	Résolu	425c50bf-b53a-46ce-b496-2cd0947d5a0e	2026-09-25 18:21:09.10562+03	Ambohipo, cité universitaire	ca331bc5-abfb-4014-ad71-b35ae59f2a4a	2026-09-30 13:07:00.674688+03
72ff7e2b-9e7d-49e0-8494-fe63fe180455	Poteau électrique penché — Anosy	Un poteau d'éclairage penche dangereusement après les fortes pluies.	Éclairage public	Urgente	Résolu	24910357-2096-4c35-9fa3-72be064e888c	2026-09-27 13:05:33.724916+03	Anosy, bord du lac	ca331bc5-abfb-4014-ad71-b35ae59f2a4a	2026-09-30 22:44:02.388548+03
02367697-4d2e-4703-bd10-e82a6ad4fb14	Poteau électrique penché — Anosy	Un poteau d'éclairage penche dangereusement après les fortes pluies.	Éclairage public	Basse	Résolu	8a4358a9-55f9-4507-8e07-abc93e3e0ad1	2026-09-25 20:44:49.312777+03	Anosy, bord du lac	be751630-427b-4401-9125-772f6074364f	2026-09-30 17:37:30.392508+03
4f2713fd-7d9d-482c-8301-8b32abe23b15	Poteau électrique penché — Ampefiloha	Un poteau d'éclairage penche dangereusement après les fortes pluies.	Éclairage public	Haute	Résolu	edafcde5-e1d6-460c-b0f0-edafc3dc8f73	2026-09-26 12:46:50.055526+03	Ampefiloha, cité 67 Ha	5bbc1b48-d8e4-4111-a925-15ae39910ba7	2026-09-30 16:35:25.054586+03
88da9040-ef87-4314-bab3-4cfb99d0eaac	Trottoir effondré — Isotry	Une partie du trottoir s'est effondrée dans le caniveau, passage piéton impossible.	Voirie	Haute	Résolu	cdc22b59-c322-4439-9d62-b4b391168394	2026-09-29 19:48:44.83336+03	Isotry, rue du marché	be751630-427b-4401-9125-772f6074364f	2026-09-30 22:02:49.929014+03
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, email, name, created_at) FROM stdin;
b28d198e-efff-436d-8184-01a509b4d419	rija.andrianaivo@seed.test	Rija Andrianaivo	2025-10-09 00:38:57.812495+03
cdc22b59-c322-4439-9d62-b4b391168394	hanitra.rakotomalala@seed.test	Hanitra Rakotomalala	2026-07-06 00:38:57.812495+03
75862a37-a4b8-45c9-8d0a-80e7e890322c	tahina.randriamampionona@seed.test	Tahina Randriamampionona	2026-08-20 00:38:57.812495+03
8a4358a9-55f9-4507-8e07-abc93e3e0ad1	voahangy.rasoanaivo@seed.test	Voahangy Rasoanaivo	2026-04-14 00:38:57.812495+03
71f10e33-267d-41a6-93c8-957194172245	mamy.razafindrakoto@seed.test	Mamy Razafindrakoto	2026-04-29 00:38:57.812495+03
24910357-2096-4c35-9fa3-72be064e888c	fanja.ravelojaona@seed.test	Fanja Ravelojaona	2026-05-10 00:38:57.812495+03
8e3903d4-7308-4066-b328-b39cc82f065e	tojo.rakotondrabe@seed.test	Tojo Rakotondrabe	2026-06-22 00:38:57.812495+03
425c50bf-b53a-46ce-b496-2cd0947d5a0e	lalaina.andriamanantena@seed.test	Lalaina Andriamanantena	2026-07-11 00:38:57.812495+03
edafcde5-e1d6-460c-b0f0-edafc3dc8f73	nirina.ramanantsoa@seed.test	Nirina Ramanantsoa	2025-11-26 00:38:57.812495+03
74f0d92d-00d3-4c13-9c81-01cdd1c39b94	haja.rabemananjara@seed.test	Haja Rabemananjara	2026-07-19 00:38:57.812495+03
ddef79e7-b393-4627-8860-9395f9242434	soa.randrianarisoa@seed.test	Soa Randrianarisoa	2025-11-03 00:38:57.812495+03
6b4e90f8-9ec4-4c08-a894-e40dbbfa92ba	toky.razanajatovo@seed.test	Toky Razanajatovo	2026-01-28 00:38:57.812495+03
78d4b516-8271-4d77-8a89-ac21941721b5	miora.rajaonarison@seed.test	Miora Rajaonarison	2026-08-16 00:38:57.812495+03
47088a32-67f9-4054-be02-9e7f321a1543	faly.andrianjafy@seed.test	Faly Andrianjafy	2026-08-17 00:38:57.812495+03
6d6daf86-e071-4ea8-9a76-e298a535c167	onja.ratsimbazafy@seed.test	Onja Ratsimbazafy	2026-07-16 00:38:57.812495+03
b7f877ef-64b5-4214-a42f-e58b97c7ccd7	jean.rakotoarisoa@seed.test	Jean Rakotoarisoa	2025-11-22 00:38:57.812495+03
5bbc1b48-d8e4-4111-a925-15ae39910ba7	hery.randrianasolo@seed.test	Hery Randrianasolo	2025-11-07 00:38:57.812495+03
ad6466cc-1aa6-4fb9-8e53-6efe9223ccf9	njaka.razafimahatratra@seed.test	Njaka Razafimahatratra	2025-02-01 00:38:57.812495+03
f4b3d35a-2bab-4a3f-b911-5bb616c7d7e1	sitraka.rabearivelo@seed.test	Sitraka Rabearivelo	2024-10-25 00:38:57.812495+03
ca331bc5-abfb-4014-ad71-b35ae59f2a4a	andry.ramaroson@seed.test	Andry Ramaroson	2026-06-06 00:38:57.812495+03
be751630-427b-4401-9125-772f6074364f	volana.rakotovao@seed.test	Volana Rakotovao	2024-12-06 00:38:57.812495+03
\.


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: citizen_requests citizen_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.citizen_requests
    ADD CONSTRAINT citizen_requests_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_citizen_requests_assigned_agent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_citizen_requests_assigned_agent_id ON public.citizen_requests USING btree (assigned_agent_id);


--
-- Name: ix_citizen_requests_category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_citizen_requests_category ON public.citizen_requests USING btree (category);


--
-- Name: ix_citizen_requests_citizen_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_citizen_requests_citizen_id ON public.citizen_requests USING btree (citizen_id);


--
-- Name: ix_citizen_requests_status_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_citizen_requests_status_created_at ON public.citizen_requests USING btree (status, created_at);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: citizen_requests citizen_requests_assigned_agent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.citizen_requests
    ADD CONSTRAINT citizen_requests_assigned_agent_id_fkey FOREIGN KEY (assigned_agent_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: citizen_requests citizen_requests_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.citizen_requests
    ADD CONSTRAINT citizen_requests_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.users(id) ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict re71CBF1UfcHdgNug06NXBEhzEdmCeoPU2Ywuv2cnSHh4L7PvZpZ26oZn06BKRn

