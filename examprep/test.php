<?php
require 'vendor/autoload.php';

Flight::route('GET /users', function(){
    $db = new mysqli('localhost', 'username', 'password', 'database');

    if ($db->connect_error) {
        Flight::halt(500, 'Database connection error');
    }

    $request = Flight::request();
    $limit = isset($request->query['length']) ? (int)$request->query['length'] : 10;
    $offset = isset($request->query['start']) ? (int)$request->query['start'] : 0;
    $search = isset($request->query['search']['value']) ? $request->query['search']['value'] : '';

    $query = "SELECT * FROM users";
    $params = [];
    $types = '';

    if (!empty($search)) {
        $query .= " WHERE name LIKE ? OR email LIKE ?";
        $searchParam = '%' . $search . '%';
        $params[] = $searchParam;
        $params[] = $searchParam;
        $types .= 'ss';
    }

    $query .= " LIMIT ?, ?";
    $params[] = $offset;
    $params[] = $limit;
    $types .= 'ii';

    $stmt = $db->prepare($query);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_all(MYSQLI_ASSOC);

    // Count total records
    $totalRecordsQuery = "SELECT COUNT(*) as count FROM users";
    $totalRecordsResult = $db->query($totalRecordsQuery);
    $totalRecords = $totalRecordsResult->fetch_assoc()['count'];

    // Count total filtered records
    $totalFilteredRecords = $totalRecords;
    if (!empty($search)) {
        $totalFilteredRecordsQuery = "SELECT COUNT(*) as count FROM users WHERE name LIKE ? OR email LIKE ?";
        $stmt = $db->prepare($totalFilteredRecordsQuery);
        $stmt->bind_param('ss', $searchParam, $searchParam);
        $stmt->execute();
        $result = $stmt->get_result();
        $totalFilteredRecords = $result->fetch_assoc()['count'];
        $stmt->close();
    }

    $response = array(
        "draw" => intval($request->query['draw']),
        "recordsTotal" => intval($totalRecords),
        "recordsFiltered" => intval($totalFilteredRecords),
        "data" => $data
    );

    Flight::json($response);
    $db->close();
});

Flight::start();
