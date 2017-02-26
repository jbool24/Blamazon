USE bamazonDB;

INSERT INTO products ( product_name, department_name, price, stock_quantity )
VALUES ('sunglasses','accessories', 40.00, 20),
('','',50.00,40);


INSERT [LOW_PRIORITY | DELAYED | HIGH_PRIORITY] [IGNORE]
    [INTO] tbl_name [(col_name,...)]
    {VALUES | VALUE} ({expr | DEFAULT},...),(...),...
    [ ON DUPLICATE KEY UPDATE
      col_name=expr
        [, col_name=expr] ... ]

