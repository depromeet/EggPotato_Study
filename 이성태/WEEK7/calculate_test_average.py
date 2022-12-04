tests = [float(input().split()[4][1:-3]) for _ in range(13)]
print(tests)
print(f'{sum(tests) / len(tests):.2}')
