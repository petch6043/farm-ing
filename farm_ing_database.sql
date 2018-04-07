-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 07, 2018 at 09:57 AM
-- Server version: 5.6.35
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `react_sql`
--

-- --------------------------------------------------------

--
-- Table structure for table `barn`
--

CREATE TABLE `barn` (
  `barn_id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `open_date` date NOT NULL,
  `close_date` date NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `barn`
--

INSERT INTO `barn` (`barn_id`, `name`, `open_date`, `close_date`, `user_id`) VALUES
(4, '1', '2018-03-01', '2018-04-30', NULL),
(5, '2', '2018-04-01', '2018-04-23', NULL),
(6, '3', '2018-04-01', '2018-04-30', NULL),
(13, '1', '2018-04-20', '0000-00-00', 1),
(14, '1', '2018-04-20', '0000-00-00', 1),
(15, '2', '2018-04-20', '0000-00-00', 1),
(16, '2', '2018-04-20', '0000-00-00', 1),
(17, '2', '2018-04-20', '0000-00-00', 1),
(18, '2', '2018-04-20', '0000-00-00', 1),
(19, '3', '2018-04-20', '0000-00-00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `food_id` int(11) NOT NULL,
  `barn_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `food_type` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`food_id`, `barn_id`, `amount`, `food_type`, `timestamp`, `user_id`) VALUES
(12, 4, 100, 1, '2018-04-06 16:09:14', 1),
(13, 15, 250, 2, '2018-04-07 07:55:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pen`
--

CREATE TABLE `pen` (
  `barn_id` int(11) NOT NULL,
  `pen_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pen`
--

INSERT INTO `pen` (`barn_id`, `pen_id`) VALUES
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(5, 5),
(18, 1),
(18, 2),
(18, 3),
(18, 4),
(18, 5),
(19, 1),
(19, 2),
(19, 3),
(19, 4),
(19, 5);

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `report_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `barn_id` int(11) NOT NULL,
  `pig_sold` int(11) NOT NULL,
  `pig_sick` int(11) NOT NULL,
  `pig_die` int(11) NOT NULL,
  `pig_current` int(11) NOT NULL,
  `food_amount` int(11) NOT NULL,
  `fpp` float NOT NULL,
  `report_type` text NOT NULL,
  `stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`report_id`, `date`, `barn_id`, `pig_sold`, `pig_sick`, `pig_die`, `pig_current`, `food_amount`, `fpp`, `report_type`, `stamp`) VALUES
(39, '0000-00-00', 4, 12, 2, 0, 15, 0, 0, 'monthly', '2018-04-06 15:48:27'),
(40, '0000-00-00', 4, 12, 2, 6, 9, 0, 0, 'monthly', '2018-04-06 15:48:58'),
(41, '0000-00-00', 4, 12, 2, 6, 9, 0, 0, 'monthly', '2018-04-06 15:49:14'),
(42, '0000-00-00', 4, 12, 2, 6, 9, 100, 11.1111, 'monthly', '2018-04-06 16:10:07');

-- --------------------------------------------------------

--
-- Table structure for table `transfer`
--

CREATE TABLE `transfer` (
  `tran_id` int(11) NOT NULL,
  `barn_id` int(11) NOT NULL,
  `type` text NOT NULL,
  `value` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transfer`
--

INSERT INTO `transfer` (`tran_id`, `barn_id`, `type`, `value`, `user_id`, `timestamp`) VALUES
(85, 4, 'add', 20, 1, '2018-04-06 15:44:52'),
(86, 4, 'sold', 12, 1, '2018-04-06 15:44:52'),
(87, 4, 'sick', 2, 1, '2018-04-06 15:45:47'),
(88, 4, 'died', 6, 1, '2018-04-06 15:48:49'),
(89, 4, 'add', 9, 1, '2018-04-06 15:46:13');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `position` text NOT NULL,
  `register_date` datetime NOT NULL,
  `lastlogin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `firstname`, `lastname`, `position`, `register_date`, `lastlogin`) VALUES
(1, 'Stephen', 'Hawking', 'CEO', '2018-03-31 00:00:00', '2018-03-31 06:43:38');

-- --------------------------------------------------------

--
-- Table structure for table `vaccine`
--

CREATE TABLE `vaccine` (
  `vac_id` int(11) NOT NULL,
  `vac_name` text NOT NULL,
  `required` tinyint(1) NOT NULL,
  `age` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vaccine`
--

INSERT INTO `vaccine` (`vac_id`, `vac_name`, `required`, `age`, `timestamp`) VALUES
(1, 'Program 1', 1, 20, '2018-04-07 07:52:25'),
(2, 'Program 2', 1, 40, '2018-04-07 07:52:31'),
(3, 'Program 3', 1, 70, '2018-04-07 07:52:38'),
(4, 'Actinobacillus', 0, 0, '2018-04-07 07:52:16'),
(5, 'E. coli', 0, 0, '2018-04-07 07:52:48'),
(6, 'Salmonella', 0, 0, '2018-04-07 07:53:06');

-- --------------------------------------------------------

--
-- Table structure for table `vaccine_pen`
--

CREATE TABLE `vaccine_pen` (
  `vac_id` int(11) NOT NULL,
  `pen_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vaccine_pen`
--

INSERT INTO `vaccine_pen` (`vac_id`, `pen_id`, `timestamp`) VALUES
(1, 1, '2018-04-07 07:53:37'),
(2, 1, '2018-04-07 07:53:46'),
(5, 1, '2018-04-06 18:05:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barn`
--
ALTER TABLE `barn`
  ADD PRIMARY KEY (`barn_id`),
  ADD KEY `barn_ibfk_1` (`user_id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`food_id`,`barn_id`),
  ADD KEY `pen_id` (`barn_id`),
  ADD KEY `food_ibfk_2` (`user_id`);

--
-- Indexes for table `pen`
--
ALTER TABLE `pen`
  ADD PRIMARY KEY (`pen_id`,`barn_id`),
  ADD KEY `barn_id` (`barn_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `barn_id` (`barn_id`);

--
-- Indexes for table `transfer`
--
ALTER TABLE `transfer`
  ADD PRIMARY KEY (`tran_id`,`barn_id`),
  ADD KEY `pen_id` (`barn_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `vaccine`
--
ALTER TABLE `vaccine`
  ADD PRIMARY KEY (`vac_id`);

--
-- Indexes for table `vaccine_pen`
--
ALTER TABLE `vaccine_pen`
  ADD PRIMARY KEY (`vac_id`,`pen_id`),
  ADD KEY `pen_id` (`pen_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barn`
--
ALTER TABLE `barn`
  MODIFY `barn_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `food_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `transfer`
--
ALTER TABLE `transfer`
  MODIFY `tran_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT for table `vaccine`
--
ALTER TABLE `vaccine`
  MODIFY `vac_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `barn`
--
ALTER TABLE `barn`
  ADD CONSTRAINT `barn_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `food_ibfk_1` FOREIGN KEY (`barn_id`) REFERENCES `barn` (`barn_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `food_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `pen`
--
ALTER TABLE `pen`
  ADD CONSTRAINT `pen_ibfk_1` FOREIGN KEY (`barn_id`) REFERENCES `barn` (`barn_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`barn_id`) REFERENCES `barn` (`barn_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transfer`
--
ALTER TABLE `transfer`
  ADD CONSTRAINT `transfer_ibfk_1` FOREIGN KEY (`barn_id`) REFERENCES `barn` (`barn_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transfer_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `vaccine_pen`
--
ALTER TABLE `vaccine_pen`
  ADD CONSTRAINT `vaccine_pen_ibfk_1` FOREIGN KEY (`vac_id`) REFERENCES `vaccine` (`vac_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vaccine_pen_ibfk_2` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`) ON DELETE CASCADE ON UPDATE CASCADE;
