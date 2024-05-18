<?php

require_once __DIR__ . '/../config.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class authMiddleware {
    public function before($params) {
        $headers = getallheaders();
        if(isset($headers["Authorization"])) {
            $token = $headers["Authorization"];
            try {
                $decoded_token = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
                return TRUE;
            } catch (\Exception $e) {
                Flight::halt(401, $e->getMessage());
            }
        } else {
            Flight::halt(401, "Unauthorized access");
        }
    }
}