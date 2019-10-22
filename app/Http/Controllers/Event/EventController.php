<?php

namespace App\Http\Controllers\Event;

use App\Model\Event;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    public function createEvent(Request $request){
        $rules = [
            'title' => ['required', 'string','min:2','max:255'],
            'from_date' => ['required'],
            'to_date' => ['required']
        ];
    
        $customErrorMessages = [
            'required' => 'The :attribute field can not be blank.'
        ];
        $this->validate($request, $rules, $customErrorMessages);

        $event = new Event();
        $event = $event->create(request()->all());

        return response()->json($event);
    }

    public function eventList(){
        $eventList = Event::paginate(24);
        return response()->json($eventList);
    }

    public function latestEvent(){
        $event = Event::latest()->first();
        return $event;
    }
}
