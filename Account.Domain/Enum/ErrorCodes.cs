using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Account.Domain.Enum
{
    public enum ErrorCodes
    {

        UserAlreadyExists = 12,
        UserNotFound = 13,
        UnauthorizedAccess = 14,
        UserAlreadyExistsThisRole = 15,

        IndicatorAlreadyExists = 41,

        RoleAlreadyExists = 31,
        RoleNotFound = 32,

        PasswordNotEqualsPasswordConfirm = 21,
        PasswordIsWrong = 22,

        InternalServerError = 10,

    }
}
