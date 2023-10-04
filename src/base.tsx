export default (head: string, body: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width" />
    ${head}
</head>
<body>
    ${body}
</body>
</html>
`;