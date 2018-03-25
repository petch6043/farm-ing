-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 25, 2018 at 01:55 AM
-- Server version: 5.6.35
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `react_sql`
--

-- --------------------------------------------------------

--
-- Table structure for table `Pen`
--

CREATE TABLE `Pen` (
  `pen_id` int(11) NOT NULL,
  `barn_id` int(11) NOT NULL,
  `pig_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Pen`
--

INSERT INTO `Pen` (`pen_id`, `barn_id`, `pig_number`) VALUES
(1, 1, 50),
(2, 1, 50),
(3, 1, 50),
(4, 1, 50),
(5, 2, 50),
(6, 2, 50),
(7, 2, 50),
(8, 2, 50);

-- --------------------------------------------------------

--
-- Table structure for table `Pen_count`
--

CREATE TABLE `Pen_count` (
  `pen_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `added` int(11) DEFAULT NULL,
  `sold` int(11) DEFAULT NULL,
  `died` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Pen_count`
--

INSERT INTO `Pen_count` (`pen_id`, `date`, `added`, `sold`, `died`, `total`) VALUES
(1, '2018-03-22', 2, 3, 1, 48),
(1, '2018-03-23', 1, 0, 0, 49),
(1, '2018-03-24', 5, 0, 0, 50);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `price`) VALUES
(1, 'phone', 900),
(2, 'ds', 123),
(3, 'cup', 78),
(4, 'cup', 78),
(5, 'test', 69),
(6, 'test', 69),
(7, 'Sample product', 100),
(8, 'Sample product', 100),
(9, 'Sample product', 123),
(10, 'Sample product', 123),
(11, 'wqd', 123),
(12, 'wqd', 123),
(13, 'da', 23),
(14, 'test', 69),
(15, 'good', 123),
(16, 'title', 1200),
(17, 'Sample product', 100),
(18, 'test product', 1000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Pen`
--
ALTER TABLE `Pen`
  ADD PRIMARY KEY (`pen_id`);

--
-- Indexes for table `Pen_count`
--
ALTER TABLE `Pen_count`
  ADD PRIMARY KEY (`pen_id`,`date`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;