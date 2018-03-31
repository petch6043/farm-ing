-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 31, 2018 at 02:34 PM
-- Server version: 5.6.35
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `react_sql`
--

-- --------------------------------------------------------

--
-- Table structure for table `transfer`
--

CREATE TABLE `transfer` (
  `tran_id` int(11) NOT NULL,
  `pen_id` int(11) NOT NULL,
  `type` text NOT NULL,
  `value` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transfer`
--

INSERT INTO `transfer` (`tran_id`, `pen_id`, `type`, `value`, `user_id`, `timestamp`) VALUES
(7, 1, 'add', 3, 1, '2018-03-31 06:43:43'),
(8, 1, 'add', 3, 1, '2018-03-31 06:43:52'),
(9, 1, '1', 3, 1, '2018-03-31 09:20:41'),
(10, 1, 'add', 3, 1, '2018-03-31 09:21:30'),
(11, 1, 'add', 1, 1, '2018-03-31 09:22:34'),
(12, 1, 'died', 1, 1, '2018-03-31 09:24:02'),
(13, 1, 'Sample product', 1, 1, '2018-03-31 11:35:49'),
(14, 1, 'Sample product', 1, 1, '2018-03-31 11:36:58'),
(15, 1, 'Sample product', 1, 1, '2018-03-31 11:37:32'),
(16, 1, 'Sample product', 1, 1, '2018-03-31 11:38:12'),
(17, 1, 'Sample product', 1, 1, '2018-03-31 11:40:29'),
(18, 1, 'add', 1, 1, '2018-03-31 11:57:34'),
(19, 1, 'add', 1, 1, '2018-03-31 11:57:35'),
(20, 2, 'add', 1, 1, '2018-03-31 11:57:59'),
(22, 2, 'add', 1, 1, '2018-03-31 11:58:49'),
(23, 1, 'add', 1, 1, '2018-03-31 11:59:36'),
(24, 1, 'add', 1, 1, '2018-03-31 11:59:39'),
(25, 1, 'add', 1, 1, '2018-03-31 12:02:47'),
(26, 1, 'add', 1, 1, '2018-03-31 12:03:15'),
(27, 1, 'add', 1, 1, '2018-03-31 12:03:48'),
(33, 1, 'add', 1, 1, '2018-03-31 12:05:49'),
(35, 1, 'add', 1, 1, '2018-03-31 12:06:37'),
(38, 1, 'add', 1, 1, '2018-03-31 12:15:59'),
(42, 1, 'add', 1, 1, '2018-03-31 12:16:36'),
(43, 1, 'ads', 1, 1, '2018-03-31 12:16:40'),
(44, 1, 'ads', 2, 1, '2018-03-31 12:16:43'),
(49, 1, 'ads', 3, 1, '2018-03-31 12:17:13'),
(50, 1, 'ads', 30, 1, '2018-03-31 12:17:16'),
(51, 1, 'ads', 30, 1, '2018-03-31 12:21:49'),
(52, 1, 'ads', 2, 1, '2018-03-31 12:30:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transfer`
--
ALTER TABLE `transfer`
  ADD PRIMARY KEY (`tran_id`,`pen_id`),
  ADD KEY `pen_id` (`pen_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transfer`
--
ALTER TABLE `transfer`
  MODIFY `tran_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `transfer`
--
ALTER TABLE `transfer`
  ADD CONSTRAINT `transfer_ibfk_1` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transfer_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
