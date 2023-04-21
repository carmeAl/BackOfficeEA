export interface Grupo {
    _id?: ID;
    name: string;
    password: string;
    users?: ID[];
    tickets?: ID[];

    createdAt?:   AtedAt;
    updatedAt?:   AtedAt;
}

export interface ID {
    $oid: string;
}

export interface AtedAt {
    $date: DateClass;
}

export interface DateClass {
    $numberLong: string;
}