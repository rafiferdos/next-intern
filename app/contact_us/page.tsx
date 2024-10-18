import { Button } from '@nextui-org/button';
import React from 'react';
import { auth } from "@/auth"

const contact_us = async () => {
    const session = await auth()

    return (
        <div>
            <Button color='danger'>Contact Us</Button>
            Info on user: {session?.user.name}
        </div>
    );
};

export default contact_us;