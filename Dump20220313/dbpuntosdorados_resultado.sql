-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: dbpuntosdorados
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `resultado`
--

DROP TABLE IF EXISTS `resultado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultado` (
  `id_resultado` int NOT NULL AUTO_INCREMENT,
  `anno` int DEFAULT NULL,
  `cargo` varchar(255) NOT NULL,
  `cedula` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `empresa` varchar(255) NOT NULL,
  `fecha_cargue` varchar(255) NOT NULL,
  `item` int DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `perfil` varchar(255) DEFAULT NULL,
  `puntos` int DEFAULT NULL,
  `trimestre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_resultado`),
  KEY `fk_item_idx` (`item`),
  CONSTRAINT `fk_item` FOREIGN KEY (`item`) REFERENCES `item` (`iditem`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultado`
--

LOCK TABLES `resultado` WRITE;
/*!40000 ALTER TABLE `resultado` DISABLE KEYS */;
INSERT INTO `resultado` VALUES (1,2022,'w','123456','pl6@tes.com','w','15/03/2021',1,'Pablo','Conductor',20,'1'),(2,2022,'w','123457','pl7@tes.com','w','15/03/2022',2,'Alinton','Conductor',25,'1'),(3,2022,'w','123458','pl8@tes.com','w','15/03/2022',1,'Alinton8','Conductor',25,'1'),(4,2022,'w','123456','pl6@tes.com','w','15/03/2021',2,'Pablo','Conductor',20,'1'),(5,2022,'w','123457','pl7@tes.com','w','15/03/2022',1,'Alinton','Conductor',25,'1'),(6,2022,'w','123458','pl8@tes.com','w','15/03/2022',2,'Alinton8','Conductor',25,'1');
/*!40000 ALTER TABLE `resultado` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-13 10:29:40
