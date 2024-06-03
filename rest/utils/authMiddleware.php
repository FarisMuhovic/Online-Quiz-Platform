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
                $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));
                Flight::set("jwt", $decoded_token);
                // if paths are admin based check roles
                if (strpos(Flight::request()->url, '/users/updateRole') === 0 ||
                    strpos(Flight::request()->url, '/users/remove') === 0 ||
                    strpos(Flight::request()->url, '/quiz/new') === 0 ||
                    strpos(Flight::request()->url, '/quiz/remove') === 0 
                ) {
                    if ($decoded_token->user->role == "admin") {
                        return true;
                    } else {
                        Flight::halt(403, "Forbidden access");
                    }
                } else {
                    return true;
                }
            } catch (\Exception $e) {
                Flight::halt(401, $e->getMessage());
            }
        } else {
            Flight::halt(401, "Unauthorized access");
        }
    }
}