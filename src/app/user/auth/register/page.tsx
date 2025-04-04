import { Button } from "@headlessui/react";

export default function Register(){
    return(
        <div>
            <form action="post">
                <input type="text" name = "email" defaultValue={"example@gmail.com"}/>
                <input type="text" name = "password" defaultValue={"yourPassword"}/>
                <Button type="submit" className="rounded bg-sky-600 p-5 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">Log in</Button>
            </form>
        </div>
    );
}