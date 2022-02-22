<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model {
    use HasFactory;

    public $table = "comments";
    protected $primaryKey = 'id';

    // The attributes that are mass assignable
    protected $fillable = ['content','post_id'];

    public function post() {
        return $this->belongsTo(Group::class);
    }

}
