-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 30, 2018 at 05:01 PM
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
  `barn_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `barn`
--

INSERT INTO `barn` (`barn_id`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `food_id` int(11) NOT NULL,
  `pen_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `food_type` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pen`
--

CREATE TABLE `pen` (
  `pen_id` int(11) NOT NULL,
  `barn_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `report_id` int(11) NOT NULL,
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

INSERT INTO `report` (`report_id`, `barn_id`, `pig_sold`, `pig_sick`, `pig_die`, `pig_current`, `food_amount`, `fpp`, `report_type`, `stamp`) VALUES
(1, 1, 20, 5, 3, 50, 100, 2, 'monthly', '2018-03-30 14:55:44'),
(2, 1, 20, 5, 3, 50, 100, 2, 'monthly', '2018-03-30 14:56:03');

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

-- --------------------------------------------------------

--
-- Table structure for table `vaccine`
--

CREATE TABLE `vaccine` (
  `vac_id` int(11) NOT NULL,
  `vac_name` text NOT NULL,
  `type_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vaccine`
--

INSERT INTO `vaccine` (`vac_id`, `vac_name`, `type_id`, `timestamp`) VALUES
(1, '5', 0, '2018-03-30 14:58:41'),
(2, '5', 0, '2018-03-30 14:58:45');

-- --------------------------------------------------------

--
-- Table structure for table `vaccine_pen`
--

CREATE TABLE `vaccine_pen` (
  `vac_id` int(11) NOT NULL,
  `pen_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `vaccine_type`
--

CREATE TABLE `vaccine_type` (
  `type_id` int(11) NOT NULL,
  `type_name` text NOT NULL,
  `age` int(11) NOT NULL,
  `isRequired` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vaccine_type`
--

INSERT INTO `vaccine_type` (`type_id`, `type_name`, `age`, `isRequired`) VALUES
(7, 'yolo', 8, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barn`
--
ALTER TABLE `barn`
  ADD PRIMARY KEY (`barn_id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`food_id`,`pen_id`),
  ADD KEY `pen_id` (`pen_id`);

--
-- Indexes for table `pen`
--
ALTER TABLE `pen`
  ADD PRIMARY KEY (`pen_id`),
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
  ADD PRIMARY KEY (`tran_id`,`pen_id`),
  ADD KEY `pen_id` (`pen_id`),
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
-- Indexes for table `vaccine_type`
--
ALTER TABLE `vaccine_type`
  ADD PRIMARY KEY (`type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `food_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `pen`
--
ALTER TABLE `pen`
  MODIFY `pen_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `transfer`
--
ALTER TABLE `transfer`
  MODIFY `tran_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `vaccine`
--
ALTER TABLE `vaccine`
  MODIFY `vac_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `vaccine_type`
--
ALTER TABLE `vaccine_type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `food_ibfk_1` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pen`
--
ALTER TABLE `pen`
  ADD CONSTRAINT `pen_ibfk_1` FOREIGN KEY (`barn_id`) REFERENCES `barn` (`barn_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`barn_id`) REFERENCES `barn` (`barn_id`);

--
-- Constraints for table `transfer`
--
ALTER TABLE `transfer`
  ADD CONSTRAINT `transfer_ibfk_1` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transfer_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `vaccine_pen`
--
ALTER TABLE `vaccine_pen`
  ADD CONSTRAINT `vaccine_pen_ibfk_1` FOREIGN KEY (`vac_id`) REFERENCES `vaccine` (`vac_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vaccine_pen_ibfk_2` FOREIGN KEY (`pen_id`) REFERENCES `pen` (`pen_id`);
