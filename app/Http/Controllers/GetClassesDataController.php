<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

use function Illuminate\Log\log;

class GetClassesDataController extends Controller
{
    //
    public function getClasses()
    {
        // every call to mylionsgeek to academy specific route 
        // requires "x-api-key" header to be included in this case it is a secrete code

        // call mylionsgeek to get classes there coaches and there students data
        try {
            $classes = Http::withHeaders([
                "x-api-key" => env("CLIENT_SECRET"),
            ])->get(env("CENTRAL_HOST_URL") . env("CENTRAL_HOST_CLASSES_URL"));
            $classes->throw();
        } catch (\Throwable $th) {
            log($th->getCode() . " : " . $th->getMessage());
            return redirect()->intended();
        }
        if ($classes) {
            foreach ($classes->json() ?? [] as $key => $class) {
                // create or update the class info 
                $formation = Classes::where("name", "key")->first();
                if (!$formation) {
                    Classes::create(
                        ["name" => $key]
                    );
                } else {
                    $formation->update([
                        ["name" => $key]
                    ]);
                }
                // create or update the coaches info 

                foreach ($class["coaches"] ?? [] as $ref => $coach) {
                    $user = User::where("central_id", $coach["central_id"])->first();
                    if (!$user) {
                        User::create(
                            [
                                "central_id" => $coach["central_id"],
                                "name" => $coach["name"] ?? "",
                                "email" => $coach["email"] ?? "",
                                "avatar" => $coach["avatar"] ?? "",
                                "promo" => $coach["promo"] ?? "",
                                "field" => $coach["field"] ?? "",
                                "roles" => json_encode($coach["roles"]) ?? [],
                                "status" => $coach["status"] ?? "",
                                "formation_id" => $coach["formation_id"] ?? null

                            ]
                        );
                    } else {
                        $user->update(
                            [
                                "central_id" => $coach["central_id"],
                                "name" => $coach["name"] ?? "",
                                "email" => $coach["email"] ?? "",
                                "avatar" => $coach["avatar"] ?? "",
                                "promo" => $coach["promo"] ?? "",
                                "field" => $coach["field"] ?? "",
                                "roles" => json_encode($coach["roles"]) ?? [],
                                "status" => $coach["status"] ?? "",
                                "formation_id" => $coach["formation_id"] ?? null

                            ]
                        );
                    }
                }

                // create or update the coaches students

                foreach ($class["users"] ?? [] as $student) {
                    $user = User::where("central_id", $student["central_id"])->first();
                    if (!$user) {
                        User::create(
                            [
                                "central_id" => $student["central_id"],
                                "name" => $student["name"] ?? "",
                                "email" => $student["email"] ?? "",
                                "avatar" => $student["avatar"] ?? "",
                                "promo" => $student["promo"] ?? "",
                                "field" => $student["field"] ?? "",
                                "roles" => json_encode($student["roles"]) ?? [],
                                "status" => $student["status"] ?? "",
                                "formation_id" => $student["formation_id"] ?? null

                            ]
                        );
                    } else {
                        $user->update(
                            [
                                "central_id" => $student["central_id"],
                                "name" => $student["name"] ?? "",
                                "email" => $student["email"] ?? "",
                                "avatar" => $student["avatar"] ?? "",
                                "promo" => $student["promo"] ?? "",
                                "field" => $student["field"] ?? "",
                                "roles" => json_encode($student["roles"]) ?? [],
                                "status" => $student["status"] ?? "",
                                "formation_id" => $student["formation_id"] ?? null

                            ]
                        );
                    }
                }
            }
        }
    }
}
