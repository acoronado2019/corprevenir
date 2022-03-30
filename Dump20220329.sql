-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: dbpuntosdorados
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS item;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE item (
  iditem int NOT NULL AUTO_INCREMENT,
  descripcion varchar(250) DEFAULT NULL,
  PRIMARY KEY (iditem)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS persona;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE persona (
  idpersona int NOT NULL AUTO_INCREMENT,
  nombre_completo varchar(250) DEFAULT NULL,
  numero_empleado int DEFAULT NULL,
  codigo_compania int DEFAULT NULL,
  nombre_compania varchar(250) DEFAULT NULL,
  cargo varchar(45) DEFAULT NULL,
  identificacion varchar(45) NOT NULL,
  subdivision_personal varchar(100) DEFAULT NULL,
  ceco varchar(45) DEFAULT NULL,
  cdco_descripcion varchar(250) DEFAULT NULL,
  clase_nomina varchar(45) DEFAULT NULL,
  nombre_vicepresidencia varchar(100) DEFAULT NULL,
  nombre_area_funcional varchar(45) DEFAULT NULL,
  clasificacion varchar(45) DEFAULT NULL,
  PRIMARY KEY (idpersona),
  UNIQUE KEY identificacion_UNIQUE (identificacion)
) ENGINE=InnoDB AUTO_INCREMENT=18581 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `resultado`
--

DROP TABLE IF EXISTS resultado;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE resultado (
  id_resultado int NOT NULL AUTO_INCREMENT,
  anno int NOT NULL,
  cargo varchar(255) NOT NULL,
  cedula varchar(255) NOT NULL,
  email varchar(255) DEFAULT NULL,
  empresa varchar(255) NOT NULL,
  fecha_cargue varchar(255) NOT NULL,
  item int DEFAULT NULL,
  nombre varchar(255) NOT NULL,
  perfil varchar(255) DEFAULT NULL,
  puntos int DEFAULT NULL,
  trimestre varchar(255) NOT NULL,
  PRIMARY KEY (id_resultado),
  UNIQUE KEY `unique` (anno,cedula,trimestre),
  KEY fk_item_idx (item),
  CONSTRAINT fk_item FOREIGN KEY (item) REFERENCES item (iditem)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `resultados_rol`
--

DROP TABLE IF EXISTS resultados_rol;
/*!50001 DROP VIEW IF EXISTS resultados_rol*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `resultados_rol` AS SELECT 
 1 AS id_resultado,
 1 AS anno,
 1 AS cargo,
 1 AS cedula,
 1 AS email,
 1 AS empresa,
 1 AS fecha_cargue,
 1 AS item,
 1 AS nombre,
 1 AS perfil,
 1 AS puntos,
 1 AS trimestre,
 1 AS itemD*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS rol;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE rol (
  idRol int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  PRIMARY KEY (idRol)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS user;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  iduser int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  idpersona int DEFAULT NULL,
  rol_id int DEFAULT NULL,
  PRIMARY KEY (iduser),
  UNIQUE KEY name_UNIQUE (`name`),
  KEY fk_persona_idx (idpersona),
  CONSTRAINT fk_idpersona FOREIGN KEY (idpersona) REFERENCES persona (idpersona)
) ENGINE=InnoDB AUTO_INCREMENT=6160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Final view structure for view `resultados_rol`
--

/*!50001 DROP VIEW IF EXISTS resultados_rol*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=root@localhost SQL SECURITY DEFINER */
/*!50001 VIEW resultados_rol AS select r.id_resultado AS id_resultado,r.anno AS anno,r.cargo AS cargo,r.cedula AS cedula,r.email AS email,r.empresa AS empresa,r.fecha_cargue AS fecha_cargue,r.item AS item,r.nombre AS nombre,r.perfil AS perfil,r.puntos AS puntos,r.trimestre AS trimestre,i.descripcion AS itemD from ((persona p join resultado r on((r.cedula = p.identificacion))) join item i on((r.item = i.iditem))) where (p.idpersona = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-29 20:00:59
