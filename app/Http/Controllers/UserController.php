<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $permission = DB::select('select distinct p.id_permiso from users u join usuarios_roles ur on u.id=ur.id_usuario
        join roles r on ur.id_rol=r.id_rol
        join roles_permisos rp on rp.id_rol=r.id_rol
        join permisos p on p.id_permiso=rp.id_permiso
        where u.email=?', [$request->email]);
        try {
            //if (! $token = JWTAuth::attempt($credentials, $permission)) {
               if(! $token = JWTAuth::customClaims(['permission' => $permission])->attempt($credentials)){ 
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json(compact('token'));
    }

    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                    return response()->json(['user_not_found'], 404);
            }
            } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
                    return response()->json(['token_expired'], $e->getStatusCode());
            } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                    return response()->json(['token_invalid'], $e->getStatusCode());
            } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
                    return response()->json(['token_absent'], $e->getStatusCode());
            }
            return response()->json(compact('user'));
    }

    public function register(Request $request)
        {

                $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]);

            if($validator->fails()){
                    return response()->json($validator->errors()->toJson(), 400);
            }

            $user = User::create([
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password')),
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json(compact('user','token'),201);
        }

        public function index()
        {  
           $usuarios = DB::select('select * from users order by created_at desc limit 10');
           return UsuarioResource::collection($usuarios);
        }

        public function create()
    {   
        $roles = DB::select('select * from roles order by nombre_rol asc');

        
        return response()->json($roles);    
    }

    public function show($id)
    {   
        $usuarios = DB::select('select * from users u join usuarios_roles ur on u.id=ur.id_usuario
            join roles r on ur.id_rol=r.id_rol
            join roles_permisos rp on rp.id_rol=r.id_rol
            join permisos p on p.id_permiso=rp.id_permiso
            where u.id=?', [$id]);

        return response()->json($usuarios[0]);    
    }

    public function edit($id)
    {
        $usuario_editar = DB::select('select * from users where codigo = ?', [$id]); 

        return response()->json($usuario_editar[0]);    
    }


    public function update($id, Request $request)
    {
        
        DB::update('update users set id = ?, name = ?, email = ?, email_verified_at = ?, password = ?, id_rol = ?, codigo_paciente = ?, 
                    remember_token = ?, created_at = ?, updated_at = ?', 
                    [
                    $request->id,
                    $request->name,
                    $request->email,
                    $request->password,
                    $request->id_rol, 
                    ]);

        return response()->json('Usuario actualizado!');    
    }

        
}
