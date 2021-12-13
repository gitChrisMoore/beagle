

# Public Users:

create view public_users AS
SELECT
  id,
  email
FROM auth.users;


# Current Balance:

SELECT
  user_id,
  SUM(amount) as current_balance
FROM
  transactions
WHERE status = 'FINAL'
GROUP BY
  user_id
  
407b160f-48eb-4d8e-8e4e-486c2ad5a74c