# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e10]:
    - link "Bondar Academy" [ref=e11] [cursor=pointer]:
      - /url: /
      - img "Bondar Academy" [ref=e13]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: Login to your account
        - generic [ref=e17]: Enter your email below to login to your account
      - generic [ref=e20]:
        - group [ref=e21]:
          - generic [ref=e22]: Email
          - textbox "Email" [ref=e23]:
            - /placeholder: m@example.com
        - group [ref=e24]:
          - generic [ref=e25]:
            - generic [ref=e26]: Password
            - link "Forgot your password?" [ref=e27] [cursor=pointer]:
              - /url: /forgot-password
          - textbox "Password" [ref=e28]
        - group [ref=e29]:
          - button "Login" [ref=e30]
        - generic [ref=e32]: Or continue with
        - group [ref=e33]:
          - button "Login with GitHub" [ref=e34]:
            - img [ref=e35]
            - text: Login with GitHub
          - paragraph [ref=e37]:
            - text: Don't have an account?
            - link "Sign up" [ref=e38] [cursor=pointer]:
              - /url: /register
  - alert [ref=e39]
```