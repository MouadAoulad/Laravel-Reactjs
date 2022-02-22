<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model {

    use HasFactory;

    public $table = "users";
    protected $primaryKey = 'id';

    // The attributes that are mass assignable
    protected $fillable = ['email','password'];

}
