-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: me_sweets
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `bases_postre`
--

DROP TABLE IF EXISTS `bases_postre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bases_postre` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `costo_base` decimal(10,2) NOT NULL DEFAULT '0.00',
  `precio_venta_sugerido` decimal(10,2) NOT NULL DEFAULT '0.00',
  `stock_porciones` int NOT NULL DEFAULT '0',
  `imagen_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_bases_postre_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bases de postre: bizcocho vainilla, chocolate, maracuyá, etc.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bases_postre`
--

LOCK TABLES `bases_postre` WRITE;
/*!40000 ALTER TABLE `bases_postre` DISABLE KEYS */;
INSERT INTO `bases_postre` VALUES (1,'Torta Húmeda','Masa esponjosa y húmeda estilo Tres Leches, horneada para absorber homogéneamente el licor artesanal',0.60,2.00,25,NULL,1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(2,'Bizcocho de Chocolate','Bizcocho esponjoso con cacao fino de aroma',0.70,2.00,40,NULL,0,'2026-09-26 22:19:52','2026-10-16 00:00:46'),(3,'Bizcocho de Maracuyá','Bizcocho ligero aromatizado con pulpa natural de maracuyá',0.70,2.00,30,NULL,0,'2026-09-26 22:19:52','2026-10-16 00:00:46'),(4,'Bizcocho Red Velvet','Masa aterciopelada roja clásica con toque de vainilla',0.80,2.25,25,NULL,0,'2026-09-26 22:19:52','2026-10-16 00:00:46'),(5,'Bizcocho de Coco','Bizcocho suave infusionado con leche de coco artesanal',0.70,2.00,20,NULL,0,'2026-09-26 22:19:52','2026-10-16 00:00:46');
/*!40000 ALTER TABLE `bases_postre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coberturas`
--

DROP TABLE IF EXISTS `coberturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coberturas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `costo_base` decimal(10,2) NOT NULL DEFAULT '0.00',
  `precio_venta_sugerido` decimal(10,2) NOT NULL DEFAULT '0.00',
  `stock_gramos` decimal(10,2) NOT NULL DEFAULT '0.00',
  `gramos_por_porcion` decimal(8,2) NOT NULL DEFAULT '30.00',
  `imagen_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_coberturas_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Coberturas: manjar, chocolate blanco, leche condensada, etc.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coberturas`
--

LOCK TABLES `coberturas` WRITE;
/*!40000 ALTER TABLE `coberturas` DISABLE KEYS */;
INSERT INTO `coberturas` VALUES (1,'Manjar (Dulce de Leche)','Manjar artesanal dulce de leche de paila casero',0.40,0.00,2300.00,35.00,NULL,1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(2,'Chocolate Blanco Belga','Ganache suave de chocolate blanco',0.60,0.00,1500.00,30.00,NULL,1,'2026-09-26 22:19:52','2026-10-15 22:18:55'),(3,'Leche Condensada','Bañado tradicional en rica leche condensada',0.35,0.00,1850.00,30.00,NULL,1,'2026-09-26 22:19:52','2026-10-16 00:00:46'),(4,'Crema de Vainilla','Suave crema pastelera aromatizada con vainilla',0.45,0.00,1500.00,35.00,NULL,1,'2026-09-26 22:19:52','2026-10-15 22:18:55'),(5,'Coco Rallado y Crema','Topping abundante de coco fresco rallado de Esmeraldas',0.45,0.00,800.00,30.00,NULL,1,'2026-09-26 22:19:52','2026-10-15 22:18:55'),(6,'Ganache Chocolate Negro','Intenso ganache de chocolate negro con cacao de la zona',0.65,0.00,1000.00,35.00,NULL,1,'2026-09-26 22:19:52','2026-10-15 22:18:55');
/*!40000 ALTER TABLE `coberturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuracion_sistema`
--

DROP TABLE IF EXISTS `configuracion_sistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuracion_sistema` (
  `clave` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `tipo_dato` enum('texto','numero','booleano','json') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'texto',
  `actualizado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Parámetros configurables del sistema';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracion_sistema`
--

LOCK TABLES `configuracion_sistema` WRITE;
/*!40000 ALTER TABLE `configuracion_sistema` DISABLE KEYS */;
INSERT INTO `configuracion_sistema` VALUES ('costo_delivery','3.50','Costo de delivery estándar','numero','2026-09-26 22:19:52'),('costo_operativo_porcion','0.75','Costo operativo por porción (energía, empaque, mano de obra)','numero','2026-09-26 22:19:52'),('delivery_disponible','true','Si el delivery está activo','booleano','2026-09-26 22:19:52'),('edad_minima_alcohol','18','Edad mínima para productos con alcohol','numero','2026-09-26 22:19:52'),('email_contacto','pedidosmesweets@gmail.com','Email de pedidos','texto','2026-10-18 11:33:10'),('instagram_url','https://instagram.com/mesweets','Instagram','texto','2026-09-26 22:19:52'),('max_porciones_pedido','64','Máximo de porciones por pedido','numero','2026-09-26 22:19:52'),('min_porciones_pedido','1','Mínimo de porciones por pedido','numero','2026-09-26 22:19:52'),('nombre_negocio','M&E SWEETS (Esmeraldas)','Nombre del negocio','texto','2026-10-16 00:00:46'),('nota_alcohol_dosificacion','El licor se usa únicamente como toque artesanal de sabor y aroma. Dosificación: 25 ml por porción (aprox. 30 porciones por botella de 750ml).','Nota legal alcohol','texto','2026-10-16 00:00:46'),('precio_base_por_porcion','0.00','Precio base fijo por porción (costo operativo + ganancia base)','numero','2026-10-15 22:18:55'),('slogan_negocio','Postres y tortas artesanales económicos y deliciosos','Slogan','texto','2026-10-16 00:00:46'),('telefono_contacto','+593 99 210507','Teléfono de contacto','texto','2026-10-18 11:33:10'),('tiempo_preparacion_horas','48','Tiempo estimado de preparación en horas','numero','2026-09-26 22:19:52');
/*!40000 ALTER TABLE `configuracion_sistema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frutas`
--

DROP TABLE IF EXISTS `frutas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frutas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `costo_base` decimal(8,2) NOT NULL DEFAULT '0.00',
  `precio_venta_sugerido` decimal(8,2) NOT NULL DEFAULT '0.00',
  `stock_gramos` decimal(10,2) NOT NULL DEFAULT '2000.00',
  `stock_minimo_gramos` decimal(10,2) NOT NULL DEFAULT '300.00',
  `gramos_por_porcion` decimal(8,2) NOT NULL DEFAULT '25.00',
  `imagen_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_frutas_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Frutas de decoraci├│n y relleno para las tortas y postres';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frutas`
--

LOCK TABLES `frutas` WRITE;
/*!40000 ALTER TABLE `frutas` DISABLE KEYS */;
INSERT INTO `frutas` VALUES (1,'Fresas Frescas','Fresas naturales seleccionadas cortadas en finas láminas',0.50,0.00,2600.00,400.00,25.00,'­ƒìô',1),(2,'Piña en Trozos','Trozos caramelizados de piña dulce tropical',0.40,0.00,2400.00,300.00,25.00,'­ƒìì',1),(3,'Durazno en Almíbar','Láminas suaves de durazno dulce en almíbar ligero',0.45,0.00,2500.00,300.00,25.00,'­ƒìæ',1),(4,'Sin Fruta','Postre clásico tradicional sin fruta adicional',0.00,0.00,999999.00,0.00,0.00,'­ƒÜ½',1);
/*!40000 ALTER TABLE `frutas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredientes`
--

DROP TABLE IF EXISTS `ingredientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredientes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `proveedor_id` int unsigned DEFAULT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unidad_medida` enum('g','kg','ml','l','unidad','taza','cucharada') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'g',
  `stock_actual` decimal(12,3) NOT NULL DEFAULT '0.000',
  `stock_minimo` decimal(12,3) NOT NULL DEFAULT '0.000',
  `precio_unitario` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `fecha_ingreso` date DEFAULT NULL,
  `fecha_caducidad` date DEFAULT NULL,
  `lote` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notas` text COLLATE utf8mb4_unicode_ci,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_ingredientes_nombre` (`nombre`),
  KEY `idx_ingredientes_stock_alerta` (`stock_actual`,`stock_minimo`),
  KEY `idx_ingredientes_proveedor` (`proveedor_id`),
  KEY `idx_ingredientes_caducidad` (`fecha_caducidad`),
  CONSTRAINT `fk_ingredientes_proveedor` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Materia prima e ingredientes del taller';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredientes`
--

LOCK TABLES `ingredientes` WRITE;
/*!40000 ALTER TABLE `ingredientes` DISABLE KEYS */;
INSERT INTO `ingredientes` VALUES (1,1,'Harina de trigo','g',4100.000,500.000,0.0015,'2024-01-15','2025-01-15','LOT-H001','Harina todo uso 000',1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(2,1,'Azúcar blanca','g',3300.000,500.000,0.0012,'2024-01-15','2025-06-30','LOT-A001',NULL,1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(3,NULL,'Azúcar impalpable','g',3800.000,200.000,0.0018,'2024-01-15','2025-06-30','LOT-A002','Para decoración',1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(4,3,'Leche entera','ml',2400.000,500.000,0.0009,'2024-01-20','2024-02-05','LOT-L001','Refrigerar siempre',1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(5,3,'Mantequilla','g',1700.000,200.000,0.0055,'2024-01-20','2024-03-01','LOT-M001','Sin sal',1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(6,1,'Huevos','unidad',50.000,10.000,0.1500,'2024-01-22','2024-02-15','LOT-HU01','Huevos grandes AA',1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(7,1,'Cacao en polvo','g',1000.000,100.000,0.0060,'2024-01-15','2025-01-15','LOT-C001','Cacao 100% sin azúcar',1,'2026-09-26 22:19:52','2026-09-26 22:19:52'),(8,1,'Polvo de hornear','g',470.000,50.000,0.0040,'2024-01-15','2025-01-15','LOT-P001',NULL,1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(9,1,'Bicarbonato de sodio','g',300.000,30.000,0.0020,'2024-01-15','2025-01-15','LOT-B001',NULL,1,'2026-09-26 22:19:52','2026-09-26 22:19:52'),(10,4,'Esencia de vainilla','ml',180.000,20.000,0.0200,'2024-01-15','2025-01-15','LOT-V001','Pura bourbon',1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(11,4,'Sirope de maracuyá','ml',500.000,100.000,0.0180,'2024-01-18','2024-07-18','LOT-S001','Pulpa natural concentrada',1,'2026-09-26 22:19:52','2026-09-26 22:19:52'),(12,1,'Sal fina','g',194.000,30.000,0.0008,'2024-01-15','2026-01-15','LOT-SA01',NULL,1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(13,3,'Crema de leche','ml',1100.000,200.000,0.0030,'2024-01-22','2024-02-22','LOT-CL01','35% materia grasa',1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(14,3,'Leche condensada','g',1500.000,200.000,0.0050,'2024-01-15','2025-01-15','LOT-LC01','Para relleno y cobertura',1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(15,3,'Manjar (Dulce de leche)','g',3000.000,300.000,0.0045,'2024-01-20','2024-06-20','LOT-DJ01','Artesanal local',1,'2026-09-26 22:19:52','2026-09-26 22:19:52'),(16,3,'Chocolate blanco','g',1500.000,150.000,0.0080,'2024-01-15','2024-12-15','LOT-CB01','Cobertura calidad belga',1,'2026-09-26 22:19:52','2026-09-26 22:19:52'),(17,3,'Crema de coco','ml',600.000,100.000,0.0065,'2024-01-15','2025-06-15','LOT-CC01',NULL,1,'2026-09-26 22:19:52','2026-09-26 22:19:52'),(18,4,'Coco rallado','g',500.000,50.000,0.0070,'2024-01-15','2025-01-15','LOT-CO01','Sin azúcar añadida',1,'2026-09-26 22:19:52','2026-09-26 22:19:52'),(19,NULL,'Aceite vegetal','ml',2000.000,200.000,0.0015,'2024-01-15','2025-01-15','LOT-AV01',NULL,1,'2026-09-26 22:19:52','2026-10-18 11:26:39'),(20,2,'Colorante en gel rojo','unidad',5.000,1.000,2.5000,'2024-01-15','2026-01-15','LOT-CR01','Para red velvet',1,'2026-09-26 22:19:52','2026-09-26 22:19:52'),(21,4,'Fresas frescas','g',2600.000,400.000,0.0050,'2024-01-20','2026-12-31','LOT-FR01','Fruta fresca seleccionada',1,'2026-10-15 23:39:12','2026-10-16 00:06:55'),(22,4,'Piña en trozos','g',2400.000,300.000,0.0040,'2024-01-20','2026-12-31','LOT-PI01','Piña dulce tropical',1,'2026-10-15 23:39:12','2026-10-18 11:25:31'),(23,4,'Durazno en almíbar','g',2500.000,300.000,0.0045,'2024-01-20','2026-12-31','LOT-DU01','Duraznos en almíbar de repostería',1,'2026-10-15 23:39:12','2026-10-16 00:00:46');
/*!40000 ALTER TABLE `ingredientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `licores`
--

DROP TABLE IF EXISTS `licores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `licores` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `proveedor_id` int unsigned DEFAULT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `grado_alcoholico` decimal(5,2) NOT NULL DEFAULT '0.00',
  `stock_ml` decimal(10,2) NOT NULL DEFAULT '0.00',
  `stock_minimo_ml` decimal(10,2) NOT NULL DEFAULT '0.00',
  `precio_botella_750ml` decimal(10,2) NOT NULL DEFAULT '0.00',
  `ml_por_porcion` decimal(6,2) NOT NULL DEFAULT '10.00',
  `recargo_porcion` decimal(6,2) NOT NULL DEFAULT '0.00',
  `fecha_ingreso` date DEFAULT NULL,
  `lote` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notas` text COLLATE utf8mb4_unicode_ci,
  `imagen_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_licores_nombre` (`nombre`),
  KEY `idx_licores_proveedor` (`proveedor_id`),
  KEY `idx_licores_stock` (`stock_ml`,`stock_minimo_ml`),
  CONSTRAINT `fk_licores_proveedor` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Licores y destilados para impregnación de postres';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `licores`
--

LOCK TABLES `licores` WRITE;
/*!40000 ALTER TABLE `licores` DISABLE KEYS */;
INSERT INTO `licores` VALUES (1,2,'Ron Medallo Maracuyá','Ron Saborizado',35.00,975.00,375.00,8.50,25.00,0.00,'2024-01-15','LOT-RB01','Ron Medellín sabor Maracuyá, rinde 30 porciones por botella. Sin recargo adicional ($2.00 porción total).',NULL,1,'2026-09-26 22:19:52','2026-10-16 00:06:55'),(2,2,'Ron Medallo Coco','Ron Saborizado',35.00,1500.00,375.00,8.50,25.00,0.00,'2024-01-15','LOT-AD01','Ron Medellín sabor Coco, rinde 30 porciones por botella. Sin recargo adicional ($2.00 porción total).',NULL,1,'2026-09-26 22:19:52','2026-10-16 00:00:46'),(3,2,'Crema de Whisky','Crema Whisky',17.00,1400.00,375.00,20.00,25.00,0.50,'2024-01-15','LOT-BY01','Crema de Whisky premium, botella ~$20. Recargo +$0.50 ($2.50 porción total).',NULL,1,'2026-09-26 22:19:52','2026-10-18 11:25:31'),(4,2,'Rompope Tradicional','Rompope',15.00,1500.00,375.00,10.00,25.00,0.25,'2024-01-18','LOT-LM01','Rompope artesanal tradicional ecuatoriano, botella ~$10. Recargo +$0.25 ($2.25 porción total).',NULL,1,'2026-09-26 22:19:52','2026-10-16 00:00:46'),(5,2,'Licor de Café Mazeratto','Licor Café',20.00,1500.00,375.00,12.00,25.00,0.25,'2024-01-15','LOT-KA01','Crema y Licor de Café Mazeratto, botella ~$12. Recargo +$0.25 ($2.25 porción total).',NULL,1,'2026-09-26 22:19:52','2026-10-16 00:00:46'),(6,2,'Grand Marnier','Triple Seco',40.00,750.00,375.00,55.00,8.00,0.00,'2024-01-15','LOT-GM01',NULL,NULL,0,'2026-09-26 22:19:52','2026-10-15 22:18:55'),(7,2,'Rum Malibu Coco','Ron Coco',21.00,750.00,375.00,30.00,12.00,0.00,'2024-01-15','LOT-MC01',NULL,NULL,0,'2026-09-26 22:19:52','2026-10-15 22:18:55');
/*!40000 ALTER TABLE `licores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimientos_inventario`
--

DROP TABLE IF EXISTS `movimientos_inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimientos_inventario` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tipo_recurso` enum('ingrediente','licor','cobertura','base_postre','fruta') COLLATE utf8mb4_unicode_ci NOT NULL,
  `recurso_id` int unsigned NOT NULL,
  `usuario_id` int unsigned DEFAULT NULL,
  `pedido_id` int unsigned DEFAULT NULL,
  `tipo_movimiento` enum('entrada','salida','ajuste','merma','devolucion') COLLATE utf8mb4_unicode_ci NOT NULL,
  `cantidad` decimal(12,3) NOT NULL,
  `cantidad_antes` decimal(12,3) NOT NULL DEFAULT '0.000',
  `cantidad_despues` decimal(12,3) NOT NULL DEFAULT '0.000',
  `motivo` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `lote` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_movinv_tipo_recurso` (`tipo_recurso`,`recurso_id`),
  KEY `idx_movinv_usuario` (`usuario_id`),
  KEY `idx_movinv_pedido` (`pedido_id`),
  KEY `idx_movinv_fecha` (`creado_en`),
  KEY `idx_movinv_tipo_mov` (`tipo_movimiento`),
  CONSTRAINT `fk_movinv_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_movinv_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Historial de movimientos de inventario de todos los recursos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimientos_inventario`
--

LOCK TABLES `movimientos_inventario` WRITE;
/*!40000 ALTER TABLE `movimientos_inventario` DISABLE KEYS */;
INSERT INTO `movimientos_inventario` VALUES (1,'cobertura',1,2,1,'salida',140.000,3000.000,2860.000,'Pedido #1',NULL,'2026-09-26 22:19:52'),(2,'base_postre',1,2,1,'salida',4.000,50.000,46.000,'Pedido #1',NULL,'2026-09-26 22:19:52'),(3,'licor',1,2,1,'salida',40.000,2250.000,2210.000,'Pedido #1',NULL,'2026-09-26 22:19:52'),(4,'cobertura',2,3,2,'salida',180.000,1500.000,1320.000,'Pedido #2',NULL,'2026-09-26 22:19:52'),(5,'base_postre',2,3,2,'salida',6.000,40.000,34.000,'Pedido #2',NULL,'2026-09-26 22:19:52'),(6,'licor',3,3,2,'salida',72.000,1500.000,1428.000,'Pedido #2',NULL,'2026-09-26 22:19:52'),(7,'cobertura',4,4,3,'salida',420.000,1500.000,1080.000,'Pedido #3',NULL,'2026-09-26 22:19:52'),(8,'base_postre',3,4,3,'salida',12.000,30.000,18.000,'Pedido #3',NULL,'2026-09-26 22:19:52'),(9,'ingrediente',1,1,NULL,'entrada',5000.000,0.000,5000.000,'Compra inicial proveedor',NULL,'2026-09-26 22:19:52'),(10,'ingrediente',2,1,NULL,'entrada',4000.000,0.000,4000.000,'Compra inicial proveedor',NULL,'2026-09-26 22:19:52'),(11,'cobertura',3,5,4,'salida',150.000,2000.000,1850.000,'Pedido #4',NULL,'2026-10-15 22:51:56'),(12,'base_postre',1,5,4,'salida',5.000,50.000,45.000,'Pedido #4',NULL,'2026-10-15 22:51:56'),(13,'licor',1,5,4,'salida',125.000,1500.000,1375.000,'Pedido #4',NULL,'2026-10-15 22:51:56'),(14,'ingrediente',3,1,NULL,'entrada',2000.000,2000.000,4000.000,'Ajuste por edición admin',NULL,'2026-10-15 23:16:15'),(15,'cobertura',1,2,5,'salida',280.000,3000.000,2720.000,'Pedido #5',NULL,'2026-10-15 23:49:55'),(16,'base_postre',1,2,5,'salida',8.000,45.000,37.000,'Pedido #5',NULL,'2026-10-15 23:49:55'),(17,'licor',1,2,5,'salida',200.000,1375.000,1175.000,'Pedido #5',NULL,'2026-10-15 23:49:55'),(18,'fruta',1,2,5,'salida',200.000,3000.000,2800.000,'Pedido #5',NULL,'2026-10-15 23:49:55'),(19,'ingrediente',1,2,5,'salida',360.000,5000.000,4640.000,'Pedido #5 (Receta: 8 porc.)',NULL,'2026-10-15 23:49:55'),(20,'ingrediente',2,2,5,'salida',280.000,4000.000,3720.000,'Pedido #5 (Receta: 8 porc.)',NULL,'2026-10-15 23:49:55'),(21,'ingrediente',3,2,5,'salida',80.000,4000.000,3920.000,'Pedido #5 (Receta: 8 porc.)',NULL,'2026-10-15 23:49:55'),(22,'ingrediente',4,2,5,'salida',240.000,3000.000,2760.000,'Pedido #5 (Receta: 8 porc.)',NULL,'2026-10-15 23:49:55'),(23,'ingrediente',5,2,5,'salida',120.000,2000.000,1880.000,'Pedido #5 (Receta: 8 porc.)',NULL,'2026-10-15 23:49:55'),(24,'ingrediente',6,2,5,'salida',4.000,60.000,56.000,'Pedido #5 (Receta: 8 porc.)',NULL,'2026-10-15 23:49:55'),(25,'ingrediente',8,2,5,'salida',12.000,500.000,488.000,'Pedido #5 (Receta: 8 porc.)',NULL,'2026-10-15 23:49:55'),(26,'ingrediente',10,2,5,'salida',8.000,200.000,192.000,'Pedido #5 (Receta: 8 porc.)',NULL,'2026-10-15 23:49:55'),(27,'ingrediente',12,2,5,'salida',2.400,200.000,197.600,'Pedido #5 (Receta: 8 porc.)',NULL,'2026-10-15 23:49:55'),(28,'ingrediente',13,2,5,'salida',160.000,1500.000,1340.000,'Pedido #5 (Receta: 8 porc.)',NULL,'2026-10-15 23:49:55'),(29,'ingrediente',14,2,5,'salida',200.000,2000.000,1800.000,'Pedido #5 (Receta: 8 porc.)',NULL,'2026-10-15 23:49:55'),(34,'cobertura',1,1,6,'salida',280.000,2720.000,2440.000,'Pedido #6 (En Preparación)',NULL,'2026-10-16 00:06:55'),(35,'base_postre',1,1,6,'salida',8.000,37.000,29.000,'Pedido #6 (En Preparación)',NULL,'2026-10-16 00:06:55'),(36,'licor',1,1,6,'salida',200.000,1175.000,975.000,'Pedido #6 (En Preparación)',NULL,'2026-10-16 00:06:55'),(37,'fruta',1,1,6,'salida',200.000,2800.000,2600.000,'Pedido #6 (En Preparación)',NULL,'2026-10-16 00:06:55'),(38,'ingrediente',1,1,6,'salida',360.000,4640.000,4280.000,'Pedido #6 (Receta: 8 porc. En Preparación)',NULL,'2026-10-16 00:06:55'),(39,'ingrediente',2,1,6,'salida',280.000,3720.000,3440.000,'Pedido #6 (Receta: 8 porc. En Preparación)',NULL,'2026-10-16 00:06:55'),(40,'ingrediente',3,1,6,'salida',80.000,3920.000,3840.000,'Pedido #6 (Receta: 8 porc. En Preparación)',NULL,'2026-10-16 00:06:55'),(41,'ingrediente',4,1,6,'salida',240.000,2760.000,2520.000,'Pedido #6 (Receta: 8 porc. En Preparación)',NULL,'2026-10-16 00:06:55'),(42,'ingrediente',5,1,6,'salida',120.000,1880.000,1760.000,'Pedido #6 (Receta: 8 porc. En Preparación)',NULL,'2026-10-16 00:06:55'),(43,'ingrediente',6,1,6,'salida',4.000,56.000,52.000,'Pedido #6 (Receta: 8 porc. En Preparación)',NULL,'2026-10-16 00:06:55'),(44,'ingrediente',8,1,6,'salida',12.000,488.000,476.000,'Pedido #6 (Receta: 8 porc. En Preparación)',NULL,'2026-10-16 00:06:55'),(45,'ingrediente',10,1,6,'salida',8.000,192.000,184.000,'Pedido #6 (Receta: 8 porc. En Preparación)',NULL,'2026-10-16 00:06:55'),(46,'ingrediente',12,1,6,'salida',2.400,197.600,195.200,'Pedido #6 (Receta: 8 porc. En Preparación)',NULL,'2026-10-16 00:06:55'),(47,'ingrediente',13,1,6,'salida',160.000,1340.000,1180.000,'Pedido #6 (Receta: 8 porc. En Preparación)',NULL,'2026-10-16 00:06:55'),(48,'ingrediente',14,1,6,'salida',200.000,1800.000,1600.000,'Pedido #6 (Receta: 8 porc. En Preparación)',NULL,'2026-10-16 00:06:55'),(49,'cobertura',1,1,7,'salida',140.000,2440.000,2300.000,'Pedido #7 (En Preparación)',NULL,'2026-10-18 11:25:31'),(50,'base_postre',1,1,7,'salida',4.000,29.000,25.000,'Pedido #7 (En Preparación)',NULL,'2026-10-18 11:25:31'),(51,'licor',3,1,7,'salida',100.000,1500.000,1400.000,'Pedido #7 (En Preparación)',NULL,'2026-10-18 11:25:31'),(52,'fruta',2,1,7,'salida',100.000,2500.000,2400.000,'Pedido #7 (En Preparación)',NULL,'2026-10-18 11:25:31'),(53,'ingrediente',1,1,7,'salida',180.000,4280.000,4100.000,'Pedido #7 (Receta: 4 porc. En Preparación)',NULL,'2026-10-18 11:25:31'),(54,'ingrediente',2,1,7,'salida',140.000,3440.000,3300.000,'Pedido #7 (Receta: 4 porc. En Preparación)',NULL,'2026-10-18 11:25:31'),(55,'ingrediente',3,1,7,'salida',40.000,3840.000,3800.000,'Pedido #7 (Receta: 4 porc. En Preparación)',NULL,'2026-10-18 11:25:31'),(56,'ingrediente',4,1,7,'salida',120.000,2520.000,2400.000,'Pedido #7 (Receta: 4 porc. En Preparación)',NULL,'2026-10-18 11:25:31'),(57,'ingrediente',5,1,7,'salida',60.000,1760.000,1700.000,'Pedido #7 (Receta: 4 porc. En Preparación)',NULL,'2026-10-18 11:25:31'),(58,'ingrediente',6,1,7,'salida',2.000,52.000,50.000,'Pedido #7 (Receta: 4 porc. En Preparación)',NULL,'2026-10-18 11:25:31'),(59,'ingrediente',8,1,7,'salida',6.000,476.000,470.000,'Pedido #7 (Receta: 4 porc. En Preparación)',NULL,'2026-10-18 11:25:31'),(60,'ingrediente',10,1,7,'salida',4.000,184.000,180.000,'Pedido #7 (Receta: 4 porc. En Preparación)',NULL,'2026-10-18 11:25:31'),(61,'ingrediente',12,1,7,'salida',1.200,195.200,194.000,'Pedido #7 (Receta: 4 porc. En Preparación)',NULL,'2026-10-18 11:25:31'),(62,'ingrediente',13,1,7,'salida',80.000,1180.000,1100.000,'Pedido #7 (Receta: 4 porc. En Preparación)',NULL,'2026-10-18 11:25:31'),(63,'ingrediente',14,1,7,'salida',100.000,1600.000,1500.000,'Pedido #7 (Receta: 4 porc. En Preparación)',NULL,'2026-10-18 11:25:31'),(68,'ingrediente',19,1,NULL,'entrada',1000.000,1000.000,2000.000,'Ajuste por edición admin',NULL,'2026-10-18 11:26:39');
/*!40000 ALTER TABLE `movimientos_inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenes_produccion`
--

DROP TABLE IF EXISTS `ordenes_produccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordenes_produccion` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `pedido_id` int unsigned NOT NULL,
  `generado_por` int unsigned DEFAULT NULL,
  `porciones` int unsigned NOT NULL,
  `detalles_json` json NOT NULL,
  `tecnica_impreg` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` enum('pendiente','en_proceso','completada') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pendiente',
  `notas` text COLLATE utf8mb4_unicode_ci,
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completado_en` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_op_pedido` (`pedido_id`),
  KEY `idx_op_generado_por` (`generado_por`),
  CONSTRAINT `fk_op_generado_por` FOREIGN KEY (`generado_por`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_op_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Fichas de producción generadas para el taller';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenes_produccion`
--

LOCK TABLES `ordenes_produccion` WRITE;
/*!40000 ALTER TABLE `ordenes_produccion` DISABLE KEYS */;
INSERT INTO `ordenes_produccion` VALUES (1,2,1,6,'{\"base\": \"Bizcocho de Chocolate\", \"licor\": \"Baileys Original\", \"tecnica\": \"Impregnacion: pincelado capas con licor Baileys, 5 min reposo, 3 aplicaciones\", \"cobertura\": \"Chocolate Blanco Belga\", \"porciones\": 6, \"tipo_postre\": \"Cupcakes Premium\", \"ingredientes\": [{\"nombre\": \"Harina\", \"cantidad_g\": 240}, {\"nombre\": \"Cacao en polvo\", \"cantidad_g\": 90}, {\"nombre\": \"Azúcar\", \"cantidad_g\": 270}, {\"nombre\": \"Mantequilla\", \"cantidad_g\": 132}, {\"nombre\": \"Huevos\", \"cantidad_unidad\": 3}, {\"nombre\": \"Leche\", \"cantidad_ml\": 210}], \"ml_licor_total\": 72, \"ml_licor_porcion\": 12}','Impregnacion: pincelado capas con licor Baileys, 5 min reposo entre capas, 3 aplicaciones','en_proceso',NULL,'2026-09-26 22:19:52',NULL),(2,3,1,12,'{\"base\": \"Bizcocho de Maracuyá\", \"fruta\": \"Sin Fruta\", \"licor\": \"Sin alcohol\", \"tecnica\": \"Pincelado con brocha de silicona\", \"cobertura\": \"Crema de Vainilla\", \"porciones\": 12, \"tipo_postre\": \"Torta Completa\", \"ml_licor_total\": 0, \"ml_licor_porcion\": 0.00}','Pincelado con brocha de silicona','pendiente',NULL,'2026-10-16 00:23:15',NULL);
/*!40000 ALTER TABLE `ordenes_produccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `cliente_id` int unsigned NOT NULL,
  `tipo_postre_id` int unsigned DEFAULT NULL,
  `base_id` int unsigned DEFAULT NULL,
  `cobertura_id` int unsigned DEFAULT NULL,
  `fruta_id` int unsigned DEFAULT '4',
  `licor_id` int unsigned DEFAULT NULL,
  `porciones` int unsigned NOT NULL DEFAULT '1',
  `sin_alcohol` tinyint(1) NOT NULL DEFAULT '0',
  `tipo_empaque` enum('individual','torta_completa') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'individual',
  `estado` enum('pendiente','en_preparacion','en_camino','entregado','cancelado') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pendiente',
  `precio_base_unit` decimal(10,2) NOT NULL DEFAULT '0.00',
  `precio_cobertura` decimal(10,2) NOT NULL DEFAULT '0.00',
  `precio_licor` decimal(10,2) NOT NULL DEFAULT '0.00',
  `precio_total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `direccion_entrega` text COLLATE utf8mb4_unicode_ci,
  `notas_cliente` text COLLATE utf8mb4_unicode_ci,
  `notas_admin` text COLLATE utf8mb4_unicode_ci,
  `stock_reservado` tinyint(1) NOT NULL DEFAULT '0',
  `fecha_pedido` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_entrega_est` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_pedidos_cliente` (`cliente_id`),
  KEY `idx_pedidos_estado` (`estado`),
  KEY `idx_pedidos_fecha` (`fecha_pedido`),
  KEY `idx_pedidos_tipo` (`tipo_postre_id`),
  KEY `idx_pedidos_base` (`base_id`),
  KEY `idx_pedidos_cobertura` (`cobertura_id`),
  KEY `idx_pedidos_licor` (`licor_id`),
  KEY `fk_pedidos_fruta` (`fruta_id`),
  CONSTRAINT `fk_pedidos_base` FOREIGN KEY (`base_id`) REFERENCES `bases_postre` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_pedidos_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_pedidos_cobertura` FOREIGN KEY (`cobertura_id`) REFERENCES `coberturas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_pedidos_fruta` FOREIGN KEY (`fruta_id`) REFERENCES `frutas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_pedidos_licor` FOREIGN KEY (`licor_id`) REFERENCES `licores` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_pedidos_tipo` FOREIGN KEY (`tipo_postre_id`) REFERENCES `tipos_postre` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Pedidos de clientes';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,2,2,1,1,4,1,4,0,'individual','entregado',2.00,0.00,0.00,8.00,'Av. Amazonas N26-48, Quito','Empaque bien los envases',NULL,1,'2026-09-26 22:19:52','2026-10-15 22:18:55',NULL),(2,3,3,2,2,4,3,6,0,'individual','entregado',2.00,0.00,0.50,15.00,'Calle Colón 456, Guayaquil','Caja de regalo si tiene','',1,'2026-09-26 22:19:52','2026-10-15 23:13:25',NULL),(3,4,1,3,4,4,NULL,12,1,'torta_completa','entregado',2.00,0.00,0.00,24.00,'Calle Bolívar 123, Cuenca','Sin topping extra','',1,'2026-09-26 22:19:52','2026-10-16 00:23:26',NULL),(4,5,2,1,3,4,1,5,0,'individual','entregado',2.00,0.00,0.00,10.00,'Folker Anderson y Versalles','Frente al Colegio Luis Tello, mano derecha alado de la tienda esquinera','',1,'2026-10-15 22:51:56','2026-10-15 23:17:03','2026-10-17 22:51:56'),(5,2,1,1,1,1,1,8,0,'torta_completa','entregado',2.00,0.00,0.00,16.00,'Direccion prueba','Prueba descuento inventario','',1,'2026-10-15 23:49:55','2026-10-16 00:23:31','2026-10-17 23:49:55'),(6,5,1,1,1,1,1,8,0,'torta_completa','entregado',2.00,0.00,0.00,16.00,'Barrio Las Palmas','Prueba descuento en preparacion','Entregado al cliente',1,'2026-10-16 00:06:55','2026-10-16 00:07:05','2026-10-18 00:06:55'),(7,6,2,1,1,2,3,4,0,'individual','entregado',2.00,0.00,0.50,10.00,'Barrio 24 Mayo','Frente al colegio Luis Tello','',1,'2026-10-18 11:24:01','2026-10-18 11:25:41','2026-10-20 11:24:01');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contacto` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` text COLLATE utf8mb4_unicode_ci,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_proveedores_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Proveedores de insumos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'Distribuidora La Playita (Esmeraldas)','Carlos Pérez','0991234567','ventas@laplayita.ec',NULL,1,'2026-09-26 22:19:52'),(2,'Licores del Pacífico (Esmeraldas)','María López','0987654321','pedidos@licoresdelpacifico.ec',NULL,1,'2026-09-26 22:19:52'),(3,'Lácteos y Manjares del Campo','Pedro Gómez','0993456789','pedidos@lacteosdelcampo.ec',NULL,1,'2026-09-26 22:19:52'),(4,'Cacao y Frutos Esmeraldas','Ana Ruiz','0994567890','frutos@esmeraldasagro.ec',NULL,1,'2026-09-26 22:19:52');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recetas_ingredientes`
--

DROP TABLE IF EXISTS `recetas_ingredientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recetas_ingredientes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `base_id` int unsigned NOT NULL,
  `ingrediente_id` int unsigned NOT NULL,
  `cantidad` decimal(10,3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_receta_base_ingr` (`base_id`,`ingrediente_id`),
  KEY `idx_receta_ingrediente` (`ingrediente_id`),
  CONSTRAINT `fk_receta_base` FOREIGN KEY (`base_id`) REFERENCES `bases_postre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_receta_ingrediente` FOREIGN KEY (`ingrediente_id`) REFERENCES `ingredientes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Receta de cada base de postre (ingredientes por porción)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recetas_ingredientes`
--

LOCK TABLES `recetas_ingredientes` WRITE;
/*!40000 ALTER TABLE `recetas_ingredientes` DISABLE KEYS */;
INSERT INTO `recetas_ingredientes` VALUES (9,2,1,40.000),(10,2,2,45.000),(11,2,7,15.000),(12,2,5,22.000),(13,2,6,0.500),(14,2,4,35.000),(15,2,8,1.500),(16,2,12,0.300),(17,3,1,42.000),(18,3,2,38.000),(19,3,19,20.000),(20,3,6,0.600),(21,3,11,25.000),(22,3,8,1.500),(23,3,12,0.300),(24,4,1,45.000),(25,4,2,42.000),(26,4,7,5.000),(27,4,5,20.000),(28,4,6,0.500),(29,4,4,30.000),(30,4,9,1.000),(31,4,20,0.050),(32,4,12,0.300),(33,5,1,40.000),(34,5,2,38.000),(35,5,17,30.000),(36,5,18,10.000),(37,5,6,0.500),(38,5,8,1.500),(39,5,12,0.300),(40,1,1,45.000),(41,1,2,35.000),(42,1,3,10.000),(43,1,4,30.000),(44,1,5,15.000),(45,1,6,0.500),(46,1,8,1.500),(47,1,10,1.000),(48,1,12,0.300),(49,1,13,20.000),(50,1,14,25.000);
/*!40000 ALTER TABLE `recetas_ingredientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_roles_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Catálogo de roles del sistema';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','Administrador con acceso total al sistema','2026-09-26 22:19:52'),(2,'cliente','Cliente que puede hacer pedidos','2026-09-26 22:19:52');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_postre`
--

DROP TABLE IF EXISTS `tipos_postre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_postre` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `imagen_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tipos_postre_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tipos de postre: torta, cupcake, porción individual, etc.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_postre`
--

LOCK TABLES `tipos_postre` WRITE;
/*!40000 ALTER TABLE `tipos_postre` DISABLE KEYS */;
INSERT INTO `tipos_postre` VALUES (1,'Torta Completa','Torta entera para 8-32 porciones con decoración personalizada',NULL,1,'2026-09-26 22:19:52'),(2,'Porciones Individuales','Porciones servidas en envases individuales herméticos',NULL,1,'2026-09-26 22:19:52'),(3,'Cupcakes Premium','Cupcakes con base y cobertura a elección, caja de 6 o 12',NULL,0,'2026-09-26 22:19:52'),(4,'Shots de Postre','Mini-porciones de 80g en vasito de vidrio reutilizable',NULL,0,'2026-09-26 22:19:52');
/*!40000 ALTER TABLE `tipos_postre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `rol_id` tinyint unsigned NOT NULL,
  `nombre` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'bcrypt hash',
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion_entrega` text COLLATE utf8mb4_unicode_ci,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `token_sesion` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token_expira` datetime DEFAULT NULL,
  `creado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_usuarios_email` (`email`),
  KEY `idx_usuarios_rol` (`rol_id`),
  KEY `idx_usuarios_activo` (`activo`),
  CONSTRAINT `fk_usuarios_rol` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Usuarios del sistema: administradores y clientes';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,1,'Maria Elena','Torres','admin@mesweets.com','$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMaJobKChol9I0WbAWlH7.5.iW',NULL,NULL,NULL,1,'3s085ZvUpd68d77YGKc4uE3IJMDB9TFK0c9g0MKkTACq8Sj2,EVXTuwhkVnpaUtln8ae1CVYnXDbFE7pDfT0qxSj8tpwdA4D7','2026-10-19 11:58:44','2026-09-26 22:19:52','2026-10-18 11:58:45'),(2,2,'Sofia','Martínez','sofia@ejemplo.com','$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC02ovAiR/GaRLIGCBs.','0981234567','1995-03-15','Av. Amazonas N26-48, Quito',1,NULL,NULL,'2026-09-26 22:19:52','2026-09-26 22:19:52'),(3,2,'Diego','Ramírez','diego@ejemplo.com','$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC02ovAiR/GaRLIGCBs.','0997654321','1990-07-22','Calle Colón 456, Guayaquil',1,NULL,NULL,'2026-09-26 22:19:52','2026-09-26 22:19:52'),(4,2,'Valentina','Herrera','valentina@ejemplo.com','$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC02ovAiR/GaRLIGCBs.','0962345678','2000-11-08','Calle Bolívar 123, Cuenca',1,NULL,NULL,'2026-09-26 22:19:52','2026-09-26 22:19:52'),(5,2,'Edwin Guillermo','San Lucas Arroyo','edwin123@gmail.com','$2a$12$LLao3rMJ1shYWMuNzjci3unenQpZz.pU/WYyvCp0Foa5ygYDvp2Xq','0999210507','2001-03-18','Barrio 24 de mayo',1,'token_test_edwin_999','2026-10-17 00:06:36','2026-10-15 22:49:37','2026-10-16 00:06:36'),(6,2,'Kevin','Cortez','kevin@gmail.com','$2a$12$s0RBQmY.Nq25kOnc4ugUveGZW0KCbt4gUqGJQG2c9lsWKRx3MDOHm','0999215836','2001-07-15','Barrio 24 de mayo',1,NULL,'2026-10-19 11:23:56','2026-10-18 11:23:50','2026-10-18 11:24:34');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_ingredientes_alerta`
--

DROP TABLE IF EXISTS `v_ingredientes_alerta`;
/*!50001 DROP VIEW IF EXISTS `v_ingredientes_alerta`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_ingredientes_alerta` AS SELECT 
 1 AS `id`,
 1 AS `nombre`,
 1 AS `unidad_medida`,
 1 AS `stock_actual`,
 1 AS `stock_minimo`,
 1 AS `precio_unitario`,
 1 AS `fecha_caducidad`,
 1 AS `lote`,
 1 AS `proveedor`,
 1 AS `estado_stock`,
 1 AS `dias_para_caducidad`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_ingresos_periodo`
--

DROP TABLE IF EXISTS `v_ingresos_periodo`;
/*!50001 DROP VIEW IF EXISTS `v_ingresos_periodo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_ingresos_periodo` AS SELECT 
 1 AS `fecha`,
 1 AS `semana`,
 1 AS `anio`,
 1 AS `mes`,
 1 AS `num_pedidos`,
 1 AS `total_porciones`,
 1 AS `ingresos`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_licores_alerta`
--

DROP TABLE IF EXISTS `v_licores_alerta`;
/*!50001 DROP VIEW IF EXISTS `v_licores_alerta`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_licores_alerta` AS SELECT 
 1 AS `id`,
 1 AS `nombre`,
 1 AS `tipo`,
 1 AS `grado_alcoholico`,
 1 AS `stock_ml`,
 1 AS `stock_minimo_ml`,
 1 AS `ml_por_porcion`,
 1 AS `porciones_disponibles`,
 1 AS `proveedor`,
 1 AS `estado_stock`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_pedidos_resumen`
--

DROP TABLE IF EXISTS `v_pedidos_resumen`;
/*!50001 DROP VIEW IF EXISTS `v_pedidos_resumen`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_pedidos_resumen` AS SELECT 
 1 AS `pedido_id`,
 1 AS `fecha_pedido`,
 1 AS `estado`,
 1 AS `precio_total`,
 1 AS `porciones`,
 1 AS `tipo_empaque`,
 1 AS `sin_alcohol`,
 1 AS `direccion_entrega`,
 1 AS `notas_cliente`,
 1 AS `notas_admin`,
 1 AS `stock_reservado`,
 1 AS `fecha_entrega_est`,
 1 AS `cliente`,
 1 AS `cliente_email`,
 1 AS `cliente_telefono`,
 1 AS `tipo_postre`,
 1 AS `base`,
 1 AS `cobertura`,
 1 AS `licor`,
 1 AS `fruta`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_ventas_por_cobertura`
--

DROP TABLE IF EXISTS `v_ventas_por_cobertura`;
/*!50001 DROP VIEW IF EXISTS `v_ventas_por_cobertura`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_ventas_por_cobertura` AS SELECT 
 1 AS `cobertura`,
 1 AS `total_pedidos`,
 1 AS `total_porciones`,
 1 AS `ingreso_total`,
 1 AS `ticket_promedio`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_ventas_por_licor`
--

DROP TABLE IF EXISTS `v_ventas_por_licor`;
/*!50001 DROP VIEW IF EXISTS `v_ventas_por_licor`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_ventas_por_licor` AS SELECT 
 1 AS `licor`,
 1 AS `total_pedidos`,
 1 AS `total_porciones`,
 1 AS `ingreso_total`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_ingredientes_alerta`
--

/*!50001 DROP VIEW IF EXISTS `v_ingredientes_alerta`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ingredientes_alerta` AS select `i`.`id` AS `id`,`i`.`nombre` AS `nombre`,`i`.`unidad_medida` AS `unidad_medida`,`i`.`stock_actual` AS `stock_actual`,`i`.`stock_minimo` AS `stock_minimo`,`i`.`precio_unitario` AS `precio_unitario`,`i`.`fecha_caducidad` AS `fecha_caducidad`,`i`.`lote` AS `lote`,`p`.`nombre` AS `proveedor`,(case when (`i`.`stock_actual` = 0) then 'SIN_STOCK' when (`i`.`stock_actual` <= `i`.`stock_minimo`) then 'STOCK_BAJO' else 'NORMAL' end) AS `estado_stock`,(to_days(`i`.`fecha_caducidad`) - to_days(curdate())) AS `dias_para_caducidad` from (`ingredientes` `i` left join `proveedores` `p` on((`p`.`id` = `i`.`proveedor_id`))) where (`i`.`activo` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_ingresos_periodo`
--

/*!50001 DROP VIEW IF EXISTS `v_ingresos_periodo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ingresos_periodo` AS select cast(`p`.`fecha_pedido` as date) AS `fecha`,yearweek(`p`.`fecha_pedido`,1) AS `semana`,year(`p`.`fecha_pedido`) AS `anio`,month(`p`.`fecha_pedido`) AS `mes`,count(`p`.`id`) AS `num_pedidos`,sum(`p`.`porciones`) AS `total_porciones`,sum(`p`.`precio_total`) AS `ingresos` from `pedidos` `p` where (`p`.`estado` <> 'cancelado') group by cast(`p`.`fecha_pedido` as date),yearweek(`p`.`fecha_pedido`,1),year(`p`.`fecha_pedido`),month(`p`.`fecha_pedido`) order by `fecha` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_licores_alerta`
--

/*!50001 DROP VIEW IF EXISTS `v_licores_alerta`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_licores_alerta` AS select `l`.`id` AS `id`,`l`.`nombre` AS `nombre`,`l`.`tipo` AS `tipo`,`l`.`grado_alcoholico` AS `grado_alcoholico`,`l`.`stock_ml` AS `stock_ml`,`l`.`stock_minimo_ml` AS `stock_minimo_ml`,`l`.`ml_por_porcion` AS `ml_por_porcion`,floor((`l`.`stock_ml` / nullif(`l`.`ml_por_porcion`,0))) AS `porciones_disponibles`,`p`.`nombre` AS `proveedor`,(case when (`l`.`stock_ml` = 0) then 'SIN_STOCK' when (`l`.`stock_ml` <= `l`.`stock_minimo_ml`) then 'STOCK_BAJO' else 'NORMAL' end) AS `estado_stock` from (`licores` `l` left join `proveedores` `p` on((`p`.`id` = `l`.`proveedor_id`))) where (`l`.`activo` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_pedidos_resumen`
--

/*!50001 DROP VIEW IF EXISTS `v_pedidos_resumen`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_pedidos_resumen` AS select `p`.`id` AS `pedido_id`,`p`.`fecha_pedido` AS `fecha_pedido`,`p`.`estado` AS `estado`,`p`.`precio_total` AS `precio_total`,`p`.`porciones` AS `porciones`,`p`.`tipo_empaque` AS `tipo_empaque`,`p`.`sin_alcohol` AS `sin_alcohol`,`p`.`direccion_entrega` AS `direccion_entrega`,`p`.`notas_cliente` AS `notas_cliente`,`p`.`notas_admin` AS `notas_admin`,`p`.`stock_reservado` AS `stock_reservado`,`p`.`fecha_entrega_est` AS `fecha_entrega_est`,concat(`u`.`nombre`,' ',`u`.`apellido`) AS `cliente`,`u`.`email` AS `cliente_email`,`u`.`telefono` AS `cliente_telefono`,`tp`.`nombre` AS `tipo_postre`,`bp`.`nombre` AS `base`,`c`.`nombre` AS `cobertura`,`l`.`nombre` AS `licor`,coalesce(`f`.`nombre`,'Sin fruta') AS `fruta` from ((((((`pedidos` `p` join `usuarios` `u` on((`u`.`id` = `p`.`cliente_id`))) left join `tipos_postre` `tp` on((`tp`.`id` = `p`.`tipo_postre_id`))) left join `bases_postre` `bp` on((`bp`.`id` = `p`.`base_id`))) left join `coberturas` `c` on((`c`.`id` = `p`.`cobertura_id`))) left join `licores` `l` on((`l`.`id` = `p`.`licor_id`))) left join `frutas` `f` on((`f`.`id` = `p`.`fruta_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_ventas_por_cobertura`
--

/*!50001 DROP VIEW IF EXISTS `v_ventas_por_cobertura`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ventas_por_cobertura` AS select `c`.`nombre` AS `cobertura`,count(`p`.`id`) AS `total_pedidos`,sum(`p`.`porciones`) AS `total_porciones`,sum(`p`.`precio_total`) AS `ingreso_total`,avg(`p`.`precio_total`) AS `ticket_promedio` from (`pedidos` `p` join `coberturas` `c` on((`c`.`id` = `p`.`cobertura_id`))) where (`p`.`estado` <> 'cancelado') group by `c`.`id`,`c`.`nombre` order by `ingreso_total` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_ventas_por_licor`
--

/*!50001 DROP VIEW IF EXISTS `v_ventas_por_licor`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ventas_por_licor` AS select coalesce(`l`.`nombre`,'Sin Alcohol') AS `licor`,count(`p`.`id`) AS `total_pedidos`,sum(`p`.`porciones`) AS `total_porciones`,sum(`p`.`precio_total`) AS `ingreso_total` from (`pedidos` `p` left join `licores` `l` on((`l`.`id` = `p`.`licor_id`))) where (`p`.`estado` <> 'cancelado') group by `l`.`id`,`l`.`nombre` order by `ingreso_total` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- =============================================================================
-- STORED PROCEDURES
-- =============================================================================

DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_crear_pedido`$$
CREATE PROCEDURE `sp_crear_pedido`(
    IN  p_cliente_id      INT UNSIGNED,
    IN  p_tipo_postre_id  INT UNSIGNED,
    IN  p_base_id         INT UNSIGNED,
    IN  p_cobertura_id    INT UNSIGNED,
    IN  p_licor_id        INT UNSIGNED,
    IN  p_porciones       INT UNSIGNED,
    IN  p_sin_alcohol     TINYINT(1),
    IN  p_tipo_empaque    VARCHAR(20),
    IN  p_direccion       TEXT,
    IN  p_notas           TEXT,
    OUT p_pedido_id       INT UNSIGNED,
    OUT p_mensaje         VARCHAR(500)
)
BEGIN
    DECLARE v_stock_cob    DECIMAL(10,2) DEFAULT 0;
    DECLARE v_gxp          DECIMAL(8,2)  DEFAULT 0;
    DECLARE v_g_nec        DECIMAL(10,2) DEFAULT 0;
    DECLARE v_stock_licor  DECIMAL(10,2) DEFAULT 0;
    DECLARE v_mlxp         DECIMAL(6,2)  DEFAULT 0;
    DECLARE v_ml_nec       DECIMAL(10,2) DEFAULT 0;
    DECLARE v_p_base       DECIMAL(10,2) DEFAULT 0;
    DECLARE v_p_cob        DECIMAL(10,2) DEFAULT 0;
    DECLARE v_p_licor      DECIMAL(10,2) DEFAULT 0;
    DECLARE v_precio_total DECIMAL(10,2) DEFAULT 0;
    DECLARE v_stock_base   INT           DEFAULT 0;
    DECLARE v_ok           TINYINT(1)    DEFAULT 1;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_pedido_id = 0;
        SET p_mensaje = 'ERROR: Fallo en la transaccion. Intente de nuevo.';
    END;

    SET p_pedido_id = 0;
    SET p_mensaje   = 'ERROR: Proceso no iniciado';

    START TRANSACTION;

    SELECT stock_gramos, gramos_por_porcion, precio_venta_sugerido
    INTO v_stock_cob, v_gxp, v_p_cob
    FROM coberturas WHERE id = p_cobertura_id AND activo = 1 FOR UPDATE;

    SET v_g_nec = v_gxp * p_porciones;
    IF v_stock_cob < v_g_nec THEN
        ROLLBACK;
        SET p_pedido_id = 0;
        SET p_mensaje = CONCAT('Stock insuficiente de cobertura. Disponible: ', v_stock_cob, 'g, Requerido: ', v_g_nec, 'g');
        SET v_ok = 0;
    END IF;

    IF v_ok = 1 THEN
        SELECT stock_porciones, precio_venta_sugerido
        INTO v_stock_base, v_p_base
        FROM bases_postre WHERE id = p_base_id AND activo = 1 FOR UPDATE;

        IF v_stock_base < p_porciones THEN
            ROLLBACK;
            SET p_pedido_id = 0;
            SET p_mensaje = CONCAT('Stock insuficiente de base. Disponible: ', v_stock_base, ' porciones, Requerido: ', p_porciones);
            SET v_ok = 0;
        END IF;
    END IF;

    IF v_ok = 1 THEN
        SET v_p_licor = 0.00;
        IF p_licor_id IS NOT NULL AND p_sin_alcohol = 0 THEN
            SELECT stock_ml, ml_por_porcion, recargo_porcion
            INTO v_stock_licor, v_mlxp, v_p_licor
            FROM licores WHERE id = p_licor_id AND activo = 1 FOR UPDATE;

            SET v_ml_nec = v_mlxp * p_porciones;
            IF v_stock_licor < v_ml_nec THEN
                ROLLBACK;
                SET p_pedido_id = 0;
                SET p_mensaje = CONCAT('Stock insuficiente de licor. Disponible: ', v_stock_licor, 'ml, Requerido: ', v_ml_nec, 'ml');
                SET v_ok = 0;
            END IF;
        END IF;
    END IF;

    IF v_ok = 1 THEN
        SET v_precio_total = (COALESCE(v_p_base, 2.00) + COALESCE(v_p_cob, 0.00) + COALESCE(v_p_licor, 0.00)) * p_porciones;

        INSERT INTO pedidos (
            cliente_id, tipo_postre_id, base_id, cobertura_id, licor_id,
            porciones, sin_alcohol, tipo_empaque, estado,
            precio_base_unit, precio_cobertura, precio_licor, precio_total,
            direccion_entrega, notas_cliente, stock_reservado, fecha_entrega_est
        ) VALUES (
            p_cliente_id, p_tipo_postre_id, p_base_id, p_cobertura_id,
            IF(p_sin_alcohol=1, NULL, p_licor_id),
            p_porciones, p_sin_alcohol, p_tipo_empaque, 'pendiente',
            COALESCE(v_p_base,0), COALESCE(v_p_cob,0), COALESCE(v_p_licor,0), v_precio_total,
            p_direccion, p_notas, 1, DATE_ADD(NOW(), INTERVAL 2 DAY)
        );

        SET p_pedido_id = LAST_INSERT_ID();

        UPDATE coberturas SET stock_gramos = stock_gramos - v_g_nec WHERE id = p_cobertura_id;
        INSERT INTO movimientos_inventario (tipo_recurso, recurso_id, usuario_id, pedido_id, tipo_movimiento, cantidad, cantidad_antes, cantidad_despues, motivo)
        VALUES ('cobertura', p_cobertura_id, p_cliente_id, p_pedido_id, 'salida', v_g_nec, v_stock_cob, v_stock_cob - v_g_nec, CONCAT('Pedido #', p_pedido_id));

        UPDATE bases_postre SET stock_porciones = stock_porciones - p_porciones WHERE id = p_base_id;
        INSERT INTO movimientos_inventario (tipo_recurso, recurso_id, usuario_id, pedido_id, tipo_movimiento, cantidad, cantidad_antes, cantidad_despues, motivo)
        VALUES ('base_postre', p_base_id, p_cliente_id, p_pedido_id, 'salida', p_porciones, v_stock_base, v_stock_base - p_porciones, CONCAT('Pedido #', p_pedido_id));

        IF p_licor_id IS NOT NULL AND p_sin_alcohol = 0 THEN
            UPDATE licores SET stock_ml = stock_ml - v_ml_nec WHERE id = p_licor_id;
            INSERT INTO movimientos_inventario (tipo_recurso, recurso_id, usuario_id, pedido_id, tipo_movimiento, cantidad, cantidad_antes, cantidad_despues, motivo)
            VALUES ('licor', p_licor_id, p_cliente_id, p_pedido_id, 'salida', v_ml_nec, v_stock_licor, v_stock_licor - v_ml_nec, CONCAT('Pedido #', p_pedido_id));
        END IF;

        COMMIT;
        SET p_mensaje = 'OK';
    END IF;
END$$

DROP PROCEDURE IF EXISTS `sp_cambiar_estado_pedido`$$
CREATE PROCEDURE `sp_cambiar_estado_pedido`(
    IN  p_pedido_id    INT UNSIGNED,
    IN  p_nuevo_estado VARCHAR(20),
    IN  p_admin_id     INT UNSIGNED,
    IN  p_notas        TEXT,
    OUT p_resultado    VARCHAR(200)
)
BEGIN
    DECLARE v_estado_actual VARCHAR(20);
    SELECT estado INTO v_estado_actual FROM pedidos WHERE id = p_pedido_id;
    IF v_estado_actual IS NULL THEN
        SET p_resultado = 'ERROR: Pedido no encontrado';
    ELSEIF v_estado_actual IN ('entregado','cancelado') THEN
        SET p_resultado = CONCAT('ERROR: No se puede cambiar desde estado: ', v_estado_actual);
    ELSE
        UPDATE pedidos SET estado = p_nuevo_estado, notas_admin = COALESCE(p_notas, notas_admin) WHERE id = p_pedido_id;
        SET p_resultado = 'OK';
    END IF;
END$$

DROP PROCEDURE IF EXISTS `sp_generar_orden_produccion`$$
CREATE PROCEDURE `sp_generar_orden_produccion`(
    IN  p_pedido_id  INT UNSIGNED,
    IN  p_admin_id   INT UNSIGNED,
    OUT p_op_id      INT UNSIGNED,
    OUT p_mensaje    VARCHAR(200)
)
BEGIN
    DECLARE v_existe    INT DEFAULT 0;
    DECLARE v_base      VARCHAR(150) DEFAULT '—';
    DECLARE v_cob       VARCHAR(150) DEFAULT '—';
    DECLARE v_licor     VARCHAR(150) DEFAULT 'Sin alcohol';
    DECLARE v_ml_licor  DECIMAL(6,2) DEFAULT 0;
    DECLARE v_porciones INT          DEFAULT 1;
    DECLARE v_tipo      VARCHAR(100) DEFAULT '—';
    DECLARE v_detalles  JSON;
    DECLARE v_tecnica   VARCHAR(200) DEFAULT 'Pincelado con brocha de silicona';

    SET p_op_id   = 0;
    SET p_mensaje = 'ERROR: Proceso no iniciado';

    SELECT COUNT(*) INTO v_existe FROM ordenes_produccion WHERE pedido_id = p_pedido_id;
    IF v_existe > 0 THEN
        SET p_mensaje = 'ERROR: Ya existe orden para este pedido';
        SET p_op_id = 0;
    ELSE
        SELECT COALESCE(bp.nombre,'—'), COALESCE(c.nombre,'—'),
               COALESCE(l.nombre,'Sin alcohol'), COALESCE(l.ml_por_porcion,0),
               p.porciones, COALESCE(tp.nombre,'—')
        INTO v_base, v_cob, v_licor, v_ml_licor, v_porciones, v_tipo
        FROM pedidos p
        LEFT JOIN bases_postre bp ON bp.id = p.base_id
        LEFT JOIN coberturas   c  ON c.id  = p.cobertura_id
        LEFT JOIN licores      l  ON l.id  = p.licor_id
        LEFT JOIN tipos_postre tp ON tp.id = p.tipo_postre_id
        WHERE p.id = p_pedido_id;

        IF v_ml_licor > 0 THEN
            SET v_tecnica = 'Impregnacion: pincelado capas con licor, 5 min reposo entre capas';
        END IF;

        SET v_detalles = JSON_OBJECT(
            'tipo_postre', v_tipo, 'base', v_base, 'cobertura', v_cob,
            'licor', v_licor, 'porciones', v_porciones,
            'ml_licor_total', v_ml_licor * v_porciones,
            'ml_licor_porcion', v_ml_licor, 'tecnica', v_tecnica
        );

        INSERT INTO ordenes_produccion (pedido_id, generado_por, porciones, detalles_json, tecnica_impreg, estado)
        VALUES (p_pedido_id, p_admin_id, v_porciones, v_detalles, v_tecnica, 'pendiente');

        SET p_op_id = LAST_INSERT_ID();
        SET p_mensaje = 'OK';
        UPDATE pedidos SET estado = 'en_preparacion' WHERE id = p_pedido_id;
    END IF;
END$$

DELIMITER ;

-- =============================================================================
-- VISTA DE INGREDIENTES EN ALERTA
-- =============================================================================

CREATE OR REPLACE VIEW `v_ingredientes_alerta` AS
SELECT
    i.id, i.nombre, i.unidad_medida,
    i.stock_actual, i.stock_minimo, i.precio_unitario,
    i.fecha_caducidad, i.lote,
    p.nombre AS proveedor,
    CASE
        WHEN i.stock_actual = 0                    THEN 'SIN_STOCK'
        WHEN i.stock_actual <= i.stock_minimo      THEN 'STOCK_BAJO'
        ELSE 'NORMAL'
    END AS estado_stock,
    DATEDIFF(i.fecha_caducidad, CURDATE()) AS dias_para_caducidad
FROM ingredientes i
LEFT JOIN proveedores p ON p.id = i.proveedor_id
WHERE i.activo = 1;

-- Dump completed on 2026-10-18 16:02:37
