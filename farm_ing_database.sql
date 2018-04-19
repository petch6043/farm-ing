-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 19, 2018 at 08:30 AM
-- Server version: 5.6.35
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `react_sql`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `generate_report` ()  NO SQL
BEGIN
  UPDATE report2 SET 
    open_date = (SELECT barn.open_date FROM barn WHERE barn.barn_id=report2.barn_id),
    
    age = DATEDIFF(NOW(),open_date)+(SELECT barn.open_age FROM barn WHERE barn.barn_id=report2.barn_id),
    
    move_in = (SELECT SUM(transfer.value) FROM transfer WHERE transfer.type='add' AND transfer.barn_id=report2.barn_id),
    
    move_out = (SELECT SUM(transfer.value) FROM transfer WHERE transfer.type IN ('died','sold','sick') AND transfer.barn_id=report2.barn_id),
    
    current_pig = (move_in - move_out),
    
    cumulative_food = (SELECT SUM(food.amount) FROM food WHERE  food.barn_id=report2.barn_id),
    
    fpp = cumulative_food/current_pig,
    
    target_fpp = 1.9*age - 133
    
    WHERE barn_id IN (SELECT DISTINCT barn_id FROM barn);
    SELECT * FROM report2;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `barn`
--

CREATE TABLE `barn` (
  `barn_id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `open_date` date NOT NULL,
  `open_age` int(11) NOT NULL DEFAULT '70',
  `close_date` date DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `barn`
--

INSERT INTO `barn` (`barn_id`, `name`, `open_date`, `open_age`, `close_date`, `user_id`, `active`) VALUES
(4, '1', '2018-03-01', 70, '2018-04-30', NULL, 0),
(5, '2', '2018-04-01', 70, '2018-04-23', NULL, 0),
(6, '3', '2018-04-01', 70, '2018-04-30', NULL, 0),
(13, '1', '2018-04-20', 70, '0000-00-00', 1, 0),
(14, '1', '2018-04-20', 70, '0000-00-00', 1, 0),
(15, '2', '2018-04-20', 70, '0000-00-00', 1, 0),
(16, '2', '2018-04-20', 70, '0000-00-00', 1, 1),
(17, '2', '2018-04-20', 70, '0000-00-00', 1, 0),
(18, '2', '2018-04-20', 70, '0000-00-00', 1, 0),
(19, '3', '2018-04-20', 70, '0000-00-00', 1, 0),
(20, '5', '2018-04-08', 70, '0000-00-00', 1, 0),
(21, '4', '2018-04-08', 70, '0000-00-00', 1, 1),
(22, '4', '2018-04-09', 70, '0000-00-00', 1, 0),
(23, '4', '2018-04-10', 70, '0000-00-00', 1, 0),
(24, '2', '0000-00-00', 70, '0000-00-00', 1, 0),
(25, '2', '2018-04-04', 70, '2018-04-19', 1, 0),
(26, '5', '2018-04-01', 70, '2018-04-02', 1, 0),
(27, '3', '2018-04-18', 75, '0000-00-00', 1, 0),
(28, '3', '2018-04-19', 75, '0000-00-00', 1, 0),
(29, '3', '2018-04-19', 75, '0000-00-00', 1, 0),
(30, '3', '2018-04-19', 75, '0000-00-00', 1, 0),
(31, '3', '2018-04-19', 75, '0000-00-00', 1, 0);

--
-- Triggers `barn`
--
DELIMITER $$
CREATE TRIGGER `new_barn_added` AFTER INSERT ON `barn` FOR EACH ROW INSERT INTO report2(barn_id) VALUES(new.barn_id)
$$
DELIMITER ;

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
(13, 15, 250, 2, '2018-04-07 07:55:16', 1),
(14, 15, 132, 3, '2018-04-07 12:15:16', 1),
(17, 5, 100, 1, '2018-04-10 12:30:50', 1);

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
(19, 5),
(20, 1),
(20, 2),
(20, 3),
(20, 4),
(20, 5),
(21, 1),
(21, 2),
(21, 3),
(21, 4),
(21, 5),
(22, 1),
(22, 2),
(22, 3),
(22, 4),
(22, 5),
(23, 1),
(23, 2),
(23, 3),
(23, 4),
(23, 5),
(27, 1),
(27, 2),
(27, 3),
(27, 4),
(27, 5),
(28, 1),
(28, 2),
(28, 3),
(28, 4),
(28, 5),
(29, 1),
(29, 2),
(29, 3),
(29, 4),
(29, 5),
(30, 1),
(30, 2),
(30, 3),
(30, 4),
(30, 5),
(31, 1),
(31, 2),
(31, 3),
(31, 4),
(31, 5);

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
(42, '0000-00-00', 4, 12, 2, 6, 9, 100, 11.1111, 'monthly', '2018-04-06 16:10:07'),
(43, '0000-00-00', 4, 12, 2, 6, 9, 100, 11.1111, 'monthly', '2018-04-09 16:09:20'),
(44, '0000-00-00', 4, 12, 2, 6, 9, 100, 11.1111, 'monthly', '2018-04-09 16:41:14'),
(45, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-09 16:47:47'),
(46, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-09 16:47:47'),
(47, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-09 16:48:09'),
(48, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-09 16:48:09'),
(49, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-09 16:48:39'),
(50, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-09 16:48:39'),
(51, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 04:26:35'),
(52, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 04:26:35'),
(53, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 04:28:05'),
(54, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 04:28:05'),
(55, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 04:28:40'),
(56, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 04:28:40'),
(57, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 04:29:45'),
(58, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 04:29:45'),
(59, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 04:30:56'),
(60, '0000-00-00', 4, 12, 2, 6, 9, 100, 11.1111, 'monthly', '2018-04-10 04:31:14'),
(61, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 04:31:54'),
(62, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 04:31:54'),
(63, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 06:54:51'),
(64, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 06:54:51'),
(65, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 08:31:22'),
(66, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 08:31:22'),
(67, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 08:34:49'),
(68, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 08:34:49'),
(69, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 08:37:39'),
(70, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 08:37:39'),
(71, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 08:38:42'),
(72, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 08:38:42'),
(73, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 08:39:46'),
(74, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 08:39:46'),
(75, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 08:49:24'),
(76, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 08:49:24'),
(77, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 08:51:41'),
(78, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 08:51:41'),
(79, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 08:53:23'),
(80, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 08:53:23'),
(81, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 08:53:39'),
(82, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 08:53:39'),
(83, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 08:56:55'),
(84, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 08:56:56'),
(85, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 08:58:08'),
(86, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 08:58:08'),
(87, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 09:08:03'),
(88, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 09:08:03'),
(89, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 10:06:58'),
(90, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 10:06:58'),
(91, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 10:08:55'),
(92, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 10:08:55'),
(93, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 10:54:49'),
(94, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 10:54:49'),
(95, '0000-00-00', 4, 0, 0, 0, 50, 100, 2, 'monthly', '2018-04-10 10:55:05'),
(96, '0000-00-00', 16, 0, 0, 0, 50, 0, 0, 'monthly', '2018-04-10 10:55:05');

-- --------------------------------------------------------

--
-- Table structure for table `report2`
--

CREATE TABLE `report2` (
  `barn_id` int(11) NOT NULL,
  `open_date` date NOT NULL,
  `age` int(11) NOT NULL,
  `current_pig` int(11) NOT NULL,
  `cumulative_food` int(11) NOT NULL,
  `fpp` double(10,2) NOT NULL,
  `target_fpp` double(10,2) NOT NULL,
  `move_in` int(11) NOT NULL,
  `move_out` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `report2`
--

INSERT INTO `report2` (`barn_id`, `open_date`, `age`, `current_pig`, `cumulative_food`, `fpp`, `target_fpp`, `move_in`, `move_out`) VALUES
(4, '2018-03-01', 118, 22, 100, 4.55, 91.20, 42, 20),
(5, '2018-04-01', 87, 0, 100, 0.00, 32.30, 0, 0),
(6, '2018-04-01', 87, 0, 0, 0.00, 32.30, 0, 0),
(13, '2018-04-20', 68, 0, 0, 0.00, -3.80, 0, 0),
(14, '2018-04-20', 68, 0, 0, 0.00, -3.80, 0, 0),
(15, '2018-04-20', 68, 0, 382, 0.00, -3.80, 0, 0),
(16, '2018-04-20', 68, 50, 0, 0.00, -3.80, 50, 0),
(17, '2018-04-20', 68, 0, 0, 0.00, -3.80, 0, 0),
(18, '2018-04-20', 68, 0, 0, 0.00, -3.80, 0, 0),
(19, '2018-04-20', 68, 0, 0, 0.00, -3.80, 0, 0),
(20, '2018-04-08', 80, 0, 0, 0.00, 19.00, 0, 0),
(21, '2018-04-08', 80, 70, 0, 0.00, 19.00, 70, 0),
(22, '2018-04-09', 79, 0, 0, 0.00, 17.10, 0, 0),
(23, '2018-04-10', 78, 0, 0, 0.00, 15.20, 0, 0),
(26, '2018-04-01', 87, 0, 0, 0.00, 32.30, 0, 0),
(27, '2018-04-18', 75, 0, 0, 0.00, 9.50, 0, 0),
(28, '0000-00-00', 0, 0, 0, 0.00, 0.00, 0, 0),
(29, '0000-00-00', 0, 0, 0, 0.00, 0.00, 0, 0),
(30, '0000-00-00', 0, 0, 0, 0.00, 0.00, 0, 0),
(31, '0000-00-00', 0, 0, 0, 0.00, 0.00, 0, 0);

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
(89, 4, 'add', 9, 1, '2018-04-06 15:46:13'),
(90, 16, 'add', 50, 1, '2018-04-09 16:08:22'),
(91, 4, 'add', 12, 1, '2018-04-10 17:56:23'),
(92, 21, 'add', 70, 1, '2018-04-18 05:07:52'),
(93, 4, 'add', 1, 1, '2018-04-18 11:44:15');

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
(6, 'Salmonella', 0, 0, '2018-04-07 07:53:06'),
(7, 'dad', 0, 0, '2018-04-10 17:58:11');

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
(1, 2, '2018-04-08 10:09:40'),
(2, 1, '2018-04-07 07:53:46'),
(2, 2, '2018-04-08 10:09:22'),
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
-- Indexes for table `report2`
--
ALTER TABLE `report2`
  ADD KEY `fk1` (`barn_id`);

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
  MODIFY `barn_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `food_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;
--
-- AUTO_INCREMENT for table `transfer`
--
ALTER TABLE `transfer`
  MODIFY `tran_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;
--
-- AUTO_INCREMENT for table `vaccine`
--
ALTER TABLE `vaccine`
  MODIFY `vac_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
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
-- Constraints for table `report2`
--
ALTER TABLE `report2`
  ADD CONSTRAINT `fk1` FOREIGN KEY (`barn_id`) REFERENCES `barn` (`barn_id`);

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
