import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, req) => {
    console.log(req, 'REQ')
    return req.user;
});
